import { Component } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  constructor(private contactService: ContactService) {}

  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  photo!: string;
  role!: string;

  addContact() {

    var inputData = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      photo: this.photo,
      role: this.role
    }

    this.contactService.addContact({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      photo: this.photo,
      role: this.role
    }).subscribe((contact) => {
      console.log('Contact added:', contact);

      // this.id = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.photo = '';
      this.role = '';
    });


  }
}
