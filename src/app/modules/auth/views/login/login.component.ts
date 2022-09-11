import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '@dlp/auth/services';
import { DialogComponent } from '@dlp/shared/components';
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

  constructor(
    private _router: Router,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {}

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
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            autoFocus: true,
            data: { title: 'Error', msg: err.error.msg },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.form.reset();
          });
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
