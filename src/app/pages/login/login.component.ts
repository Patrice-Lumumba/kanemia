import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": '',
    "password": ''
  };

  http = inject(HttpClient);

  constructor(private router:Router) { }


  onLogin() {
    // debugger;
    this.http.post('https://www.api.4gul.kanemia.com/auth/login', this.loginObj).subscribe((res: any) => {
      // debugger;
      console.log("Réponse de l'API : ",res)

      if(res.token && res.user.token) {
        alert('Login successful!');
        localStorage.setItem("angular", res.token);
        // Redirect to dashboard route
        this.router.navigateByUrl("dashboard")

        console.log('Login successful! Token stored', res.token);
      }else{
        alert(res.message || "Login failed");
      }
    }, (error) => {
      alert("Erreur lors de la connexion");
      console.log("Erreur API : ", error)
    });
  }
}
