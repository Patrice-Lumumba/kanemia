import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import { Contact } from "../../shared/models/contact.model.ts";

class Contact{
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  photo?: string;
  role?: string;
}

@Injectable({
  providedIn: "root"
})

export class ContactService {
  private url = "https://www.api.4gul.kanemia.com/";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url);
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.url}/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<Contact>(`${this.url}/${id}`);
  }
}
