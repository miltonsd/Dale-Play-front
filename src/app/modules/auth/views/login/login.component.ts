import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'dlp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { validators: [Validators.required] }),
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
        next: (res) => {
          localStorage.setItem('token', res.msg.token);
          this._router.navigate(['/games']);
        },
        error: (err) => console.error(err),
        complete: () => this._router.navigate(['/games']),
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
