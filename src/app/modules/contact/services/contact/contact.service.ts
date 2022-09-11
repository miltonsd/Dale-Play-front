import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  url = environment.apiUrl + '/contact';

  constructor(private _http: HttpClient) {}

  getContacts() {
    return this._http.get(`${this.url}/`);
  }

  getContact(contactId: number) {
    return this._http.get(`${this.url}/${contactId}`);
  }

  createContact(contact: any) {
    return this._http.post(`${this.url}/`, contact);
  }

  deleteContact(contactId: number) {
    return this._http.delete(`${this.url}/${contactId}`);
  }
}
