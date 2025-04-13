import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../../shared/models/contact.model";
// import { Contact } from "../../shared/models/contact.model.ts";



@Injectable({
  providedIn: "root"
})

export class ContactService {
  // [x: string]: any;
  private url = "https://www.api.4gul.kanemia.com/contacts";

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  constructor(private http: HttpClient) {}

  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this.url);
  // }



  getAllContact(token:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
   return this.http.get<any>(this.url,{headers})
  }

  // getContacts(page: number = 1, search: string = "", token: string): Observable<any> {
  //   return this.http.get<any>(
  //     `${this.url}?page=${page}&search=${search}`,
  //     this.getHeaders()
  //   );
  // };



  // getContactById
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  

  addContact(contact: Contact): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, contact, { headers });
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  setCookie(name: string, value: string, days: number):void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

}
