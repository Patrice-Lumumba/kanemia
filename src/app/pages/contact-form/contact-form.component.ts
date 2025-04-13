import { Component, NgModule } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NgIf,],
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

  token = localStorage.getItem('token'); // Récupération du token d'authentification
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





  // addContact() {

  //   var inputData = {
  //     id: this.id,
  //     firstName: this.first_name,
  //     lastName: this.last_name,
  //     email: this.email,
  //     phone: this.phone,
  //     photo: this.photo,
  //     role: this.role
  //   }

  //   this.contactService.addContact({
  //     id: this.id,
  //     firstName: this.first_name,
  //     lastName: this.last_name,
  //     email: this.email,
  //     phone: this.phone,
  //     photo: this.photo,
  //     role: this.role
  //   }).subscribe((contact) => {
  //     console.log('Contact added:', contact);
  //     // Rediriger vers la page de contact après l'ajout
  //     this.router.navigate(['/dashboard']);

  //     // this.id = '';
  //     this.first_name = '';
  //     this.last_name = '';
  //     this.email = '';
  //     this.phone = '';
  //     this.photo = '';
  //     this.role = '';
  //   },
  //   (error) => {
  //     console.error('Error adding contact:', error);
  //   })

  // }

  ngOnInit() {
    this.contactForm = this.fb.group({
      id: ['', Validators.required],
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
        this.contactId = Number(id);
        this.editing = true; // Passer en mode édition
        this.editing = true; // Passer en mode édition
        this.contactService.getContactById(this.contactId).subscribe(contact =>{
          this.contactForm.patchValue(contact); // Remplir le formulaire avec les données du contact
        }); // Récupérer le contact à éditer
      }
    });

  }

  // Méthode pour soumettre le formulaire
  onSubmit() {
    if (this.contactForm.valid) { // Vérifier si le formulaire est valide
      const contactData = this.contactForm.value; // Récupérer les données du formulaire

      if (this.editing) { // Si en mode édition, mettre à jour le contact
        this.contactService.updateContact(this.contactId, contactData).subscribe(() => {
          console.log('Contact updated:', contactData);
          this.router.navigate(['/dashboard']); // Rediriger vers la page de contacts après la mise à jour
        });
      } else { // Sinon, ajouter un nouveau contact
        this.contactService.addContact(contactData).subscribe(() => {
          console.log('Contact added:', contactData);
          this.router.navigate(['/dashboard']); // Rediriger vers la page de contacts après l'ajout
        });
      }
    } else {
      console.error('Form is invalid'); // Afficher une erreur si le formulaire est invalide
    }
  }

  // Méthode pour annuler l'édition et revenir à la page de contacts
  cancel() {
    this.router.navigate(['/dashboard']); // Rediriger vers la page de contacts
  }



}
