// Disabling eslint for any type based on Angular official website
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthStore } from '@store/auth.store';
import { first, mergeMap, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly #authStore = inject(AuthStore);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return toObservable(this.#authStore.token).pipe(
      first(),
      mergeMap((token) => {
        if (this.#noNeedToken(req.url)) {
          return next.handle(req);
        } else {
          return next.handle(this.#injectToken(req, token ?? null));
        }
      })
    );
  }

  /**
   * Check if the url needs to be changed from app setting urls
   * @param url url
   * @returns true if url does not need to be replaced, false otherwise
   */
  #noNeedToken(url: string): boolean {
    return url.endsWith('/token');
  }

  #injectToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    return token
      ? request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
      : request;
  }
}
