import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '@dlp/users/models';
import { Role } from 'src/app/modules/roles/models/role';
import { RolesService } from 'src/app/modules/roles/services/roles.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'dlp-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css'],
})
export class UsersUpdateComponent implements OnInit {
  user!: User;
  roles: Role[] = [];

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
    private _rolesService: RolesService
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
    this._rolesService.getAllRoles().subscribe({
      next: (response: any) => {
        this.roles = response.elemts;
      },
    });
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
