// Disabling eslint for any type based on Angular official website
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import type { IConfiguration } from '@app/shared/models';
import { SettingStore } from '@store/setting.store';
import { first, mergeMap, Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  readonly #settingStore = inject(SettingStore);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return toObservable(this.#settingStore.apiUrls).pipe(
      first(),
      mergeMap((baseUrls) => {
        if (!baseUrls || this.#noNeedReplacingUrl(req.url)) {
          return next.handle(req);
        }

        return next.handle(
          req.clone({
            url: this.#replaceURL(baseUrls, req.url),
          }),
        );
      }),
    );
  }

  /**
   * Check if the url needs to be changed from app setting urls
   * @param url url
   * @returns true if url does not need to be replaced, false otherwise
   */
  #noNeedReplacingUrl(url: string): boolean {
    return url.endsWith('/token') || url.endsWith('/user') || url.endsWith('/configuration');
  }

  /**
   * Replace placeholder in requested URL if any with matched baseURL.
   * @param request original URL
   * @return new URL if any or original request
   */
  #replaceURL(baseUrls: IConfiguration | undefined, request: string): string {
    if (!baseUrls) {
      return request;
    }

    const placeholder = Object.keys(baseUrls).find((base) => request.indexOf(`{{${base}}}`) > -1);

    const replacement = placeholder ? baseUrls[placeholder as keyof IConfiguration] : null;

    return replacement ? request.replace(`{{${placeholder}}}`, replacement as string) : request;
  }
}
