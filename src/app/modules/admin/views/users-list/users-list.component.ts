import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TableColumn } from '@dlp/shared/models';
import { User } from '@dlp/users/models';
import { UsersService } from '@dlp/users/services';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@dlp/shared/components';

@Component({
  selector: 'dlp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  response: any;

  usersTableColumns: TableColumn[] = [];

  constructor(
    private _usersService: UsersService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usersTableColumns = [
      { name: 'ID', dataKey: 'id', isSortable: true },
      { name: 'Imagen', dataKey: 'image', isImage: true },
      { name: 'Nombre', dataKey: 'name', isSortable: true },
      { name: 'Apellido', dataKey: 'surname', isSortable: true },
      { name: 'Email', dataKey: 'email', isSortable: true },
      { name: 'Rol', dataKey: 'roleName', isSortable: true },
      {
        name: 'Acciones',
        dataKey: 'actionButtons',
        editButton: true,
        editUrl: '/admin/users/edit/',
        deleteButton: true,
      },
    ];

    // Busca los usuarios
    this._usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.response = response;
        const users: User[] = [];
        this.response.forEach((user: any) => {
          users.push({
            id: user.id,
            image: user.image,
            name: user.name,
            surname: user.surname,
            roleName: user.Role.name,
            email: user.email,
            idRole: user.Role.id,
            seed: user.seed,
            registro: user.registro,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          });
        });
        this.users = users;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }

  onDelete(user: any) {
    this._usersService.deleteUser(user.id).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            title: 'Eliminar Usuario',
            msg:
              'Se ha eliminado al usuario ' +
              user.name +
              ' ' +
              user.surname +
              ' con éxito.',
          },
        });
        dialogRef.afterClosed().subscribe(() => {
          this._router.navigate(['/admin/users']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        this.dialog.open(DialogComponent, {
          width: '350px',
          data: {
            title: 'Eliminar Usuario - Error',
            msg: err.error.msg,
          },
        });
      },
    });
  }
}
