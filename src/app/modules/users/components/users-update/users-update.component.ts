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
  userId!: number;
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

  onSubmit() {
    if (this.form.valid) {
      const user = {
        name: this.form.value.name || this.user.name,
        surname: this.form.value.surname || this.user.surname,
        email: this.form.value.email || this.user.email,
        idRole: this.form.value.idRole || this.user.idRole,
      };
      this._usersService.updateUser(this.userId, user).subscribe({
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

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params['userId']) {
        this.userId = params['userId'];
        this._usersService.getUser(this.userId).subscribe({
          next: (res: any) => {
            this.user = res;
          },
        });
      }
    });
    this._rolesService.getAllRoles().subscribe({
      next: (resRole: any) => {
        this.roles = resRole.elemts;
      },
    });
  }
}
