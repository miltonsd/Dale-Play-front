import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactService } from '../../services/contact/contact.service';

@Component({
  selector: 'dlp-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  contact: any;

  constructor(
    private _contactService: ContactService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtengo el id del msg por medio de la ruta
    const msgId = Number(this._activatedRoute.snapshot.paramMap.get('msgId'));
    // Busco el mensaje
    this._contactService.getContact(msgId).subscribe({
      next: (response: any) => {
        this.contact = response.elemnt;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
