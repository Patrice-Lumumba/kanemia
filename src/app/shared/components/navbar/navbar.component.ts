import { Component } from '@angular/core';
import { ContactFormComponent } from "../../../pages/contact-form/contact-form.component";
// import { ContactFormComponent } from "../../../pages/contact-form/contact-form.component";

@Component({
  selector: 'app-navbar',
  imports: [ContactFormComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
