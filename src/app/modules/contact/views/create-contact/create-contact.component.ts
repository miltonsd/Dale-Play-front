import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'dlp-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ],
    }),
    message: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private _contactService: ContactService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const contact = {
        email: this.form.value.email,
        message: this.form.value.message,
      };
      this._contactService.createContact(contact).subscribe({
        next: (res: any) => {
          console.log(res.msg);
        },
        error: (err) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
        },
        complete: () => {
          this._router.navigate(['/store']);
        },
      });
    }
  }
}
