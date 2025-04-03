import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private baseUrl = 'https://www.api.4gul.kanemia.com/';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  login(credentials: { email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, credentials).pipe(
      tap((response: any) => {
        console.log("Réponse API:", response); // <-- Vérifie la réponse exacte de l'API
        const token = response.token || response.data?.token || response.user?.token; // <-- Vérifie plusieurs formats
        if (token) {
          this.localStorageService.setItem('token', token);
          console.log("Token enregistré:", token);
        } else {
          console.error("Aucun token reçu !");
        }
      })
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  logout(): void {
    this.localStorageService.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  
}
