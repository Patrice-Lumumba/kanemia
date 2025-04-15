import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contact-form', component: ContactFormComponent, canActivate: [AuthGuard] },
  { path: 'contact-details/:id', component: ContactDetailsComponent, canActivate: [AuthGuard] },
  { path: 'contact-form/:id', component: ContactFormComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] // <-- Vérifie bien que ce guard est appliqué
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
