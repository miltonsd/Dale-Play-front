import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@dlp/auth/services';
import { DialogComponent } from '@dlp/shared/components';

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

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

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
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            autoFocus: true,
            data: {
              title: 'Registrar usuario',
              msg: res.msg,
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this._router.navigate(['/admin/users']);
          });
        },
        error: (err) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            autoFocus: true,
            data: {
              title: 'Error al registrar usuario',
              msg: err.error.msg,
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.form.reset();
          });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
