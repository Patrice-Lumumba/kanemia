import { AuthService } from './../../core/services/auth.service';
import { ContactService } from './../../core/services/contact.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Contact, Contacts } from '../../shared/models/contact.model';
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { ContactDetailsComponent } from "../contact-details/contact-details.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,
    ContactFormComponent,
    ContactDetailsComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  providers: [ContactService, AuthService],
})
export class DashboardComponent implements OnInit {
  // contactCount: number = 0; // Variable pour stocker le nombre de contacts
  // errorMessage: string = '';
  contacts: Contact[] = [];
  paginatedContacts: any[] = []; // Contacts affichés pour la page actuelle
  currentPage: number = 1;
  itemsPerPage: number = 10; // Nombre d'éléments par page
  totalPages: number = 0;
  editing: false = false; // Variable pour suivre l'état d'édition

  token: string = localStorage.getItem('token') || '';
  constructor(
    private contactService: ContactService,
    private authService: AuthService,) {
    console.log('Dashboard component');
  }

  dataSource = new MatTableDataSource<Contact>(this.contacts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // onRowSelect(selectionType: 'all' | 'single', contactData: any) {
  //   if (selectionType === 'all') {
  //     this.selectedContacts = [];
  //     if (this.selectAllCheckbox) {
  //       this.selectedContacts = JSON.parse(JSON.stringify(this.contactList));
  //       this.contacts.forEach(contact => {
  //         contact.email = true;
  //       });
  //     }
  //     else {
  //       this.contacts.forEach(contact => {
  //         contact.selected = false;
  //       });
  //     }
  //   }
  //   else if (selectionType === 'single') {
  //     if (contactData.selected) {
  //       this.selectedContacts.push(contactData);
  //     }
  //     else {
  //       this.selectedContacts.forEach((contact, index) => {
  //         if (contact.contactId === contactData.contactId) {
  //           this.selectedContacts.splice(index, 1);
  //         }
  //       });
  //     }
  //   }
  // }

  ngOnInit(): void {
    console.log('Dashboard component initialized');
    this.contactService.getAllContact(this.token).subscribe((response) => {
      this.contacts = response.data || []; // Assurez-vous que 'data' est défini avant de l'assigner

      this.totalPages = Math.ceil(this.contacts.length / this.itemsPerPage); // Calculer le nombre total de pages
      this.updatePaginatedContacts(); // Mettre à jour les contacts paginés pour la première page
      console.log('Response:', response.data);

    });
    }

    logout() {
      this.authService.logout();
    }

    updatePaginatedContacts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedContacts = this.contacts.slice(startIndex, endIndex);
    }

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedContacts();
      }
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedContacts();
      }
    }
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedContacts();
      }
    }

    submitForm(contact: Contact) {
      console.log('Form submitted:', contact);
      this.contactService.addContact(contact).subscribe((response) => {
        console.log('Contact added:', response);
        this.contacts.push(response.data); // Ajouter le contact à la liste des contacts
        this.updatePaginatedContacts(); // Mettre à jour les contacts paginés
      });
    }

    deleteContact(id: number) {
      console.log('Contact deleted:', id);
      this.contactService.deleteContact(id).subscribe((response) => {
        console.log('Contact deleted:', response);
        this.contacts = this.contacts.filter((contact) => contact.user_id !== id); // Supprimer le contact de la liste
        this.updatePaginatedContacts(); // Mettre à jour les contacts paginés
      });
    }
  }
