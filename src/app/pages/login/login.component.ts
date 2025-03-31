import { CommonModule } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginObj = {
    "email": "",
    "password": ""
  }

  http = inject(HttpClient);

  loginForm!: FormGroup;
  errorMessage: string="";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['damso@gmail.com', [Validators.required, Validators.email]],
      password: ['damso123', [Validators.required, Validators.minLength(6)]]
    });

  }

  onLogin(): void {
    if(this.loginForm.invalid){
      this.errorMessage = "Please fill a valid login form";
      return;
    }

    const {email, password} = this.loginForm.value;

    this.authService.login({email, password}, password).subscribe({
      next: (response) => {
        console.log("User logged in successfully", response);

        if(typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
          localStorage.setItem('token', response.user.token);
          console.log("Token enregistré", response.user.token)
        }else{
          console.error("Erreur : Impossible d'accéder à localStorage");
        }
        console.log("Token enregistré", response.user.token)

        this.errorMessage = '';
        this.router.navigateByUrl('/dashboard').then(success =>{
          if(success){
            console.log("Dashboard redirection réussie");
          }else{
            console.error("Erreur lors de la redirection du dashboard");
          }
        });
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    }
    );
  }

  // onLogin() {


  //   debugger;
  //   this.http.post('https://www.api.4gul.kanemia.com/auth/login', this.loginObj).subscribe((res: any) => {
  //     debugger;
  //     console.log("Réponse de l'API : ",res)

  //     if(res.token && res.data.token) {
  //       // Store JWT token in local storage
  //       // this.authService.getToken(res.token);

  //       console.log("Token : ",res.token);
  //       localStorage.setItem("angular", res.token);
  //       console.log("Token stocké : ", localStorage.getItem("token"));
  //       alert('Login successful!');
  //       // Redirect to dashboard route
  //       this.router.navigateByUrl("dashboard")

  //       console.log('Login successful! Token stored', res.token);
  //     }else{
  //       alert(res.message || "Login failed");
  //     }
  //   }, (error) => {
  //     alert("Erreur lors de la connexion");
  //     console.log("Erreur API : ", error)
  //   });
  // }

  // login(){
  //   this.authService.login({email: this.email, password: this.password}).subscribe(
  //     () => this.router.navigateByUrl("dashboard"),
  //     error => alert(error.error.message)
  //   );
  // }

  // logout(){
  //   this.authService.logout();
  //   this.router.navigateByUrl("login");
  // }


}
