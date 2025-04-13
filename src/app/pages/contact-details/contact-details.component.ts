import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Contact } from '../../shared/models/contact.model';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit{

  contactId!: number;
  contact!: Contact;
  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact() {
    this.contactService.getContactById(this.contactId).subscribe(
      (contact) => {
        this.contact = contact;
      },
      (error) => {
        console.error('Error loading contact:', error);
      }
    );
  }
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
  ) { }
}
