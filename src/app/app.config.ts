import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { httpInterceptorProviders } from './core/interceptors';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const baseUrlProvider = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }];

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless change detection (Angular 21+)
    provideZonelessChangeDetection(),
    // Animations
    provideAnimations(),
    // Http providers
    provideHttpClient(withInterceptorsFromDi()),
    ...httpInterceptorProviders,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    ...baseUrlProvider,
  ],
};
