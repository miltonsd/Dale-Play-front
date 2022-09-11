import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ContactService } from '@dlp/contact/services';
import { DialogComponent } from '@dlp/shared/components';

@Component({
  selector: 'dlp-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  form = new FormGroup({
    reason: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    }),
    message: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ],
    }),
  });

  constructor(
    private _contactService: ContactService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const contact = {
        reason: this.form.value.reason,
        message: this.form.value.message,
      };

      this._contactService.createContact(contact).subscribe({
        next: (res: any) => {
          this.dialog.open(DialogComponent, {
            width: '375px',
            autoFocus: true,
            data: {
              title: 'Enviar mensaje',
              msg: res.msg,
            },
          });
        },
        error: (err) => {
          this.dialog.open(DialogComponent, {
            width: '375px',
            autoFocus: true,
            data: {
              title: 'Error',
              msg: err.error.msg,
            },
          });
        },
      });
    }
  }
}
