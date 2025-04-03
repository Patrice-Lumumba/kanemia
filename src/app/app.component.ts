import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LoginComponent } from "./pages/login/login.component";
import { ContactFormComponent } from "./pages/contact-form/contact-form.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // RouterLink,
    // NavbarComponent,
    // ContactFormComponent,
    // FooterComponent,
    LoginComponent,
    // DashboardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kanemia';
}
