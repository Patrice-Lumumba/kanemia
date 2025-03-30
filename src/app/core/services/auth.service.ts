import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
// import * as jwt from "jsonwebtoken";
import { User } from "../../shared/models/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { baseUrl } from "../../environments/environment";


@Injectable({
  providedIn: "root"
})
export class AuthService {

  // private baseUrl = 'https://api.4gul.kanemia.com'; // Replace with your API base URL
  // private authToken = new BehaviorSubject<string | null>(null);

  // constructor(private http: HttpClient) {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     this.authToken.next(token);
  //   }
  // }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
  //     tap((response: any) => {
  //       if(response.token)
  //       {
  //         localStorage.setItem('authToken', response.token);
  //       this.authToken.next(response.token);
  //     }
  //     }
  //   ));
  // }

  // logout(): void {
  //   localStorage.removeItem('authToken');
  //   this.authToken.next(null);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('authToken');
  // }

  // isAuthenticated(): boolean {

  //   return !!this.authToken.value; // Returns true if token exists, false otherwise
  // }

  constructor(private http: HttpClient) {}
  // login(data): Observable<any> {
  //   return this.http.post(`${baseUrl}auth/login`, data);
  // }


}

  // constructor(private http: HttpClient) {}

  // login(email: string, password: string) {
  //   return this.http.post('/api/login', { email, password })
  // }
