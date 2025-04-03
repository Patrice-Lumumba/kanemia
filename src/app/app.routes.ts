import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact-form', component: ContactFormComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard] // <-- Vérifie bien que ce guard est appliqué
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
