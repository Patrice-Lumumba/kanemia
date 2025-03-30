import { Component, inject } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // fb = inject(FormBuilder)
  // http = inject(HttpClient)
  // router = inject(Router)
  // authService = inject(AuthService)

  // form = this.fb.nonNullable.group({
  //   username: ['', Validators.required],
  //   email: ['', Validators.required],
  //   password: ['', Validators.required]
  // });

  // onSubmit(): void {
  //   this.http.post<{user: User}>(
  //     'https://www.api.4gul.kanemia.com/users',{
  //       user: this.form.getRawValue(),
  //     })
  //   .subscribe((response) => {
  //     console.log('response', response);
  //     localStorage.setItem('token', response.user.token);
  //     this.authService.currentUserSign.set(response.user);
  //     this.router.navigateByUrl('/');
  //   })
  // }

  
}
