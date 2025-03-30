import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  {

  // constructor(private authService: AuthService) { }

  // intercept(req: any, next: any) {
  //   const token = this.authService.getToken();

  //   if (token) {
  //     const clonedRequest = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     return next.handle(clonedRequest);
  //   }
  //     return next.handle(req);
  //   }
}
