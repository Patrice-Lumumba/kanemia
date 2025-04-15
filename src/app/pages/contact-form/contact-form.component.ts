import { Component, NgModule } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/contact.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  error: any = null; // Variable pour stocker les erreurs

  // contacts: Contact[] = [];
  editing: boolean = false; // Variable pour suivre l'état d'édition
  contactId!: number; // Variable pour stocker l'ID du contact à éditer
  contact!: Contact; // Variable pour stocker le contact à éditer
  contactForm! : FormGroup; // FormGroup pour le formulaire de contact

  token = localStorage.getItem('token')|| '' ; // Récupération du token d'authentification
  user_id : number = Number(localStorage.getItem('id')); // ID de l'utilisateur

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
@NgModule({
  imports: [
    FormsModule, NgIf,
    NgModule,
    TableModule,
    CheckboxModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    ToggleButtonModule
  ],
  declarations: [],
  providers: [],
})


  ngOnInit() {
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      photo: ['', Validators.required],
    });

    // Récupérer l'ID du contact à partir de l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contactId = +id;
        this.editing = true; // Passer en mode édition
        this.contactService.getContactById(this.contactId).subscribe(contact =>{
          this.contactForm.patchValue(contact); // Remplir le formulaire avec les données du contact
        }); // Récupérer le contact à éditer
      }
    });

  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const contactData = {
      ...this.contactForm.value,
      user_id: this.user_id
    };

    if (this.editing && this.contactId) {
      this.contactService.updateContact(this.contactId, contactData).subscribe(() => {
        console.log('Contact mis à jour avec succès !');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.contactService.addContact(contactData, this.token).subscribe(() => {
        console.log('Contact ajouté avec succès !');
        this.router.navigate(['/dashboard']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']); // Rediriger vers la page de contacts
  }



}
