import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserImage } from '@dlp/users/models';
import { RolesService } from 'src/app/modules/roles/services/roles.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'dlp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: UserImage[] = [];

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'surname',
    'email',
    'role',
    'acciones',
  ];

  dataSource!: MatTableDataSource<UserImage>;

  constructor(
    private _usersService: UsersService,
    private _rolesService: RolesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._usersService.getAllUsers().subscribe({
      next: (res: any) => {
        res.forEach((user: any) => {
          this._rolesService.getRole(user.idRole).subscribe({
            next: (resRole: any) => {
              this._usersService.getImage(user.seed).subscribe({
                next: (res: any) => {
                  const usuario: any = {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    idRole: user.idRole,
                    role: resRole.elemnt.name,
                    image: res.results[0].picture.large,
                    email: user.email,
                  };
                  this.users.push(usuario);
                  this.dataSource = new MatTableDataSource(this.users);
                  console.log(this.users);
                },
              });
            },
            error: (err) => {
              console.error(err);
            },
          });
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onDelete(userId: number) {
    console.log('CLICK');
    console.log(userId);
    this._usersService.deleteUser(userId).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this._router.navigate(['/admin/']);
      },
    });
  }
}
