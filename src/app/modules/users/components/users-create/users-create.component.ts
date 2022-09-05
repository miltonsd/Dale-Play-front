import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@dlp/auth/services';

@Component({
  selector: 'dlp-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css'],
})
export class UsersCreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    }),
    surname: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z ]*')],
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  hidePass = true;
  hideConfirm = true;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

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
        next: (res: any) => {
          console.log(res.msg);
        },
        error: (err) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
        },
        complete: () => {
          this._router.navigate(['/admin/users']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
