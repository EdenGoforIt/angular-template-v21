// Disabling eslint for any type based on Angular official website
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.#isAddressFinderUrl(req.url)) {
      return next.handle(req);
    }

    return next.handle(
      req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      }),
    );
  }

  #isAddressFinderUrl(url: string): boolean {
    return url.includes('{{addressFinderUrl}}');
  }
}
