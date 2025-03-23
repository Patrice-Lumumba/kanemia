import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LoginComponent } from "./pages/login/login.component";
import { ContactFormComponent } from "./pages/contact-form/contact-form.component";

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    ContactFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanemia';
}
