import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
// import * as jwt from "jsonwebtoken";
import { User } from "../../shared/models/user.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { baseUrl } from "../../environments/environment";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: "root"
})
export class AuthService {

  private baseUrl= 'https://www.api.4gul.kanemia.com/';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  login(credentials: { email: string; password: string; }, password: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, credentials).pipe(
      tap((response: any) => {
        console.log("Réponse: " + response);
        if(response.token){
          this.localStorageService.setItem('token', response.user.token);
          console.log("User token: " + response.user.token);
        }
      })
    );
  }

  getToken(): string | null{
    return this.localStorageService.getItem('token');
  }

  logout(): void{
    this.localStorageService.removeItem('token');
  }

  isAuthenticated(): boolean {
    return!!this.localStorageService.getItem('token');
  }
}
