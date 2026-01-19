import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
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
    // Animations
    provideAnimations(),
    // Http providers
    provideHttpClient(withInterceptorsFromDi()),
    ...httpInterceptorProviders,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...baseUrlProvider,
  ],
};
