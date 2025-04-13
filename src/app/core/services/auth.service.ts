import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private baseUrl = 'https://www.api.4gul.kanemia.com/';
  router: any;

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

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem("id");
    this.router.navigateByUrl('/login');
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }


}
