import { AuthService } from './../../core/services/auth.service';
import { ContactService } from './../../core/services/contact.service';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Contact, Contacts } from '../../shared/models/contact.model';
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { ContactDetailsComponent } from "../contact-details/contact-details.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort} from '@angular/material/sort'
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { from } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dashboard',
  imports: [
    NavbarComponent,

    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    RouterLink,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  providers: [ContactService, AuthService],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'photo'
  ]

  ELEMENT_DATA: Contact[] = []
  dataSourceSort = new MatTableDataSource<Contact>([]);

  contacts: Contact[] = [];
  paginatedContacts: any[] = []; // Contacts affichés pour la page actuelle
  currentPage: number = 1;
  itemsPerPage: number = 10; // Nombre d'éléments par page
  totalPages: number = 0;
  editing: false = false; // Variable pour suivre l'état d'édition

  token: string = localStorage.getItem('token') || '';
  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private dialog: MatDialog,

  ) {
    console.log('Dashboard component');

  }

  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Contact>(this.contacts);

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.loadContacts()
    }

    loadContacts(): void{
      this.contactService.getContacts().subscribe((contacts: Contact[]) => {
        this.dataSource.data = contacts;
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

    // onPageChange(event: PageEvent): void {
    //   this.currentPage = event.pageIndex;
    //   this.itemsPerPage = event.pageSize;

    //   // Si vous chargez les données paginées depuis une API, appelez ici votre service
    //   this.updatePaginatedContacts();
    // }

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
      this.contactService.addContact(contact, this.token).subscribe((response) => {
        console.log('Contact added:', response);
        this.contacts.push(response.data); // Ajouter le contact à la liste des contacts
        this.updatePaginatedContacts(); // Mettre à jour les contacts paginés
      });
    }

    deleteContact(id: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: { id },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Suppression confirmée...');

          setTimeout(() => {
            this.contactService.deleteContact(id).subscribe((response) => {
              console.log('Contact supprimé :', response);
              this.contacts = this.contacts.filter((contact) => contact.user_id !== id);
              this.updatePaginatedContacts();
            });
          }, 2000); // délai de 2s
        } else {
          console.log('Suppression annulée.');
        }
      });
    }

  }
