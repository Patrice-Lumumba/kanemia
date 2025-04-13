import { CommonModule } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, ContactFormComponent, DashboardComponent, ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, ContactFormComponent, DashboardComponent, MatInputModule, MatButtonModule, MatCardModule],
    declarations: [],
    providers: [],
  })

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

  // onLogin(): void {
  //   if(this.loginForm.invalid){
  //     this.errorMessage = "Please fill a valid login form";
  //     return;
  //   }

  //   const {email, password} = this.loginForm.value;

  //   this.authService.login({email, password}, password).subscribe({
  //     next: (response) => {
  //       console.log("User logged in successfully", response);

  //       if(typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
  //         localStorage.setItem('token', response.user.token);
  //         console.log("Token enregistré", response.user.token)
  //       }else{
  //         console.error("Erreur : Impossible d'accéder à localStorage");
  //       }
  //       console.log("Token enregistré", response.user.token)

  //       this.errorMessage = '';
  //       this.router.navigateByUrl('/dashboard').then(success =>{
  //         if(success){
  //           console.log("Dashboard redirection réussie");
  //         }else{
  //           console.error("Erreur lors de la redirection du dashboard");
  //         }
  //       });
  //     },
  //     error: (error) => {
  //       this.errorMessage = error.error.message;
  //     }
  //   }
  //   );
  // }

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

  onLogin(): void {
  if (this.loginForm.invalid) {
    this.errorMessage = "Veuillez remplir correctement le formulaire";
    return;
  }

  const { email, password } = this.loginForm.value;

  this.authService.login({ email, password }).subscribe({
    next: (response) => {
      console.log("Connexion réussie:", response);

      const token = response.token || response.data?.token || response.user?.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log("Token stocké:", token);

        this.router.navigateByUrl('/dashboard', {replaceUrl: true}).then(success => {
          if (success) {
            console.log("Redirection vers le dashboard réussie");
          } else {
            console.error("Erreur de redirection" + JSON.stringify(response));
          }
        }).catch(error => {
          console.error("Erreur lors de la redirection vers le dashboard:", error);
        });
      } else {
        console.error("Erreur : Aucun token reçu");
      }
    },
    error: (error) => {
      this.errorMessage = error.error.message || "Erreur de connexion";
      console.error("Erreur API:", error);
    }
  });
}



}
