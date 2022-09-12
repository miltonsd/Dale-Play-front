import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../modules/users/models/User';
import { Role } from '@dlp/roles/models';
import { RolesService } from '@dlp/roles/services';
import { UsersService } from '@dlp/users/services';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@dlp/shared/components';

@Component({
  selector: 'dlp-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css'],
})
export class UsersUpdateComponent implements OnInit {
  user!: User;
  roles: Role[] = [];
  fotos: any[] = [];

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
    idRole: new FormControl(''),
  });

  constructor(
    private _usersService: UsersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _rolesService: RolesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = Number(this._activatedRoute.snapshot.paramMap.get('userId'));
    // Busca el usuario
    this._usersService.getUser(userId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.user = response;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
        this._router.navigate(['/admin/users']);
      },
    });

    // Busca los roles
    this._rolesService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response.elemts;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
        this._router.navigate(['/admin/users']);
      },
    });

    // Carga las fotos
    [1, 2, 3].forEach((i) =>
      Array(i)
        .fill(i)
        .forEach((_) => {
          this._usersService.getRandomImage().subscribe({
            next: (response: any) => {
              const foto = {
                value: i,
                image: response.results.picture.large,
                seed: response.info.seed,
              };
              this.fotos.push(foto);
            },
            error: (err) => {
              console.error(err);
            },
          });
        })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const user = {
        name: this.form.value.name || this.user.name,
        surname: this.form.value.surname || this.user.surname,
        email: this.form.value.email || this.user.email,
        idRole: this.form.value.idRole || this.user.idRole,
      };
      this._usersService.updateUser(this.user.id, user).subscribe({
        next: (res: any) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            data: {
              title: 'Editar usuario',
              msg: user.name + ' ' + res.msg + ' con éxito.',
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this._router.navigate(['/admin/users']);
          });
        },
        error: (err) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            data: {
              title: 'Editar juego',
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
