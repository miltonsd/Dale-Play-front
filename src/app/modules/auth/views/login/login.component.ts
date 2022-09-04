import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@dlp/auth/services';
@Component({
  selector: 'dlp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
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
  });
  hide = true;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const user = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      this._authService.login(user).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
        },
        error: (err) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
        },
        complete: () => {
          this._router.navigate(['/store']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
