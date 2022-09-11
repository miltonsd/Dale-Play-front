import { Component, OnInit } from '@angular/core';
import { ContactService } from '@dlp/contact/services';
import { TableColumn } from '@dlp/shared/models';

@Component({
  selector: 'dlp-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  response: any;

  contactsTableColumns: TableColumn[] = [];

  constructor(private _contactService: ContactService) {}

  ngOnInit(): void {
    this.contactsTableColumns = [
      { name: 'ID', dataKey: 'id', isSortable: true },
      { name: 'Email', dataKey: 'email' },
      { name: 'Motivo', dataKey: 'reason' },
      { name: 'Enviado', dataKey: 'createdAt', isSortable: true },
      {
        name: 'Acciones',
        dataKey: 'actionButtons',
        showDetailsButton: true,
        detailsUrl: '/contact/message/',
      },
    ];

    // Busca los contactos
    this._contactService.getContacts().subscribe({
      next: (response: any) => {
        this.response = response.elemts;
        const contacts: any[] = [];
        this.response.forEach((contact: any) => {
          contacts.push({
            id: contact.id,
            email: contact.email,
            reason: contact.reason,
            message: contact.message,
            createdAt: contact.createdAt,
          });
        });
        this.contacts = contacts;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
