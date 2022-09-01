import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'dlp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    }),
    surname: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { validators: [Validators.required] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),
  });
  hidePass = true;
  hideConfirm = true;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.form.value);
  }

  onSubmit() {
    if (this.form.valid) {
      const user = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        email: this.form.value.email,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      };
      this._authService.register(user).subscribe({
        next: (res) => {
          console.log(res.msg);
        },
        error: (err) => console.error(err),
        complete: () => this._router.navigate(['/login']),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
