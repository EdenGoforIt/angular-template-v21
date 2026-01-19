// Disabling eslint for any type based on Angular official website
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromAuth } from '@store/auth';
import { AuthState } from '@store/auth/auth.reducers';
import { first, mergeMap, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #store = inject(Store<AuthState>);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.#store.select(fromAuth.token).pipe(
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
