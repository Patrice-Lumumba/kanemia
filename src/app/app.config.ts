import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // provideHttpClient({ withCredentials: true }), // Uncomment this line if you want to include credentials in requests
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    provideHttpClient(),
  ]
};
