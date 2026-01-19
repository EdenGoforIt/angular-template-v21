import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';
import { BaseUrlInterceptor } from './baseUrl.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

// Note: the order is important as it represents how the http requests are handled
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
