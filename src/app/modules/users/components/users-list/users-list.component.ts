import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '@dlp/users/models';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'dlp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'surname',
    'email',
    'role',
    'acciones',
  ];

  dataSource!: MatTableDataSource<User>;

  constructor(private _usersService: UsersService, private _router: Router) {}

  ngOnInit(): void {
    // Busca los usuarios
    this._usersService.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
      complete: () => {
        // Carga los usuarios en la tabla
        this.dataSource = new MatTableDataSource(this.users);
      },
    });
  }

  onDelete(userId: number) {
    this._usersService.deleteUser(userId).subscribe({
      next: (response: any) => {
        console.log(response.msg);
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
