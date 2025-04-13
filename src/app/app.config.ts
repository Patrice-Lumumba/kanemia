import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ApplicationConfig, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

NgModule({
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, ContactFormComponent, DashboardComponent, HttpClient],
  declarations: [],
  providers: [provideHttpClient()],
})

export const appConfig: ApplicationConfig = {

  providers: [
    provideHttpClient(withFetch()), // Provide the HttpClient module
    NgModule,

    NgModel,
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // provideHttpClient({ withCredentials: true }), // Uncomment this line if you want to include credentials in requests
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    // provideHttpClient(),
  ],
};
