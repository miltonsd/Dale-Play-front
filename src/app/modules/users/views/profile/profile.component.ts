import { Component, OnInit } from '@angular/core';

import { UsersService } from '@dlp/users/services';
import { AuthService } from '@dlp/auth/services';
import { GamesService } from '@dlp/games/services';
import { TableColumn } from '@dlp/shared/models';
import { Game } from '@dlp/games/models';
import { User } from '@dlp/users/models';
@Component({
  selector: 'dlp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  response: any;
  user!: User;
  games: Game[] = [];

  gamesTableColumns: TableColumn[] = [];

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
    private _gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesTableColumns = [
      { name: 'Imagen', dataKey: 'image', isImage: true },
      { name: 'Nombre', dataKey: 'name', isSortable: true },
      { name: 'Categoría', dataKey: 'nameCategory', isSortable: true },
      { name: 'Desarrollador', dataKey: 'nameDeveloper', isSortable: true },
      { name: 'Valoración', dataKey: 'valoration', isSortable: true },
      {
        name: 'Acciones',
        dataKey: 'actionButtons',
        showDetailsButton: true,
        detailsUrl: '/store/game/',
      },
    ];

    // Obtiene el id del usuario loggeado
    const userId = this._authService.getCurrentUserId();

    // Cargar el usuario
    this._usersService.getUser(userId).subscribe({
      next: (res: any) => {
        this.user = res;
        this.user.registro = res.createdAt.slice(0, 10);
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });

    // Buscar los juegos que posee el usuario
    this._usersService.getUserGames(userId).subscribe({
      next: (response: any) => {
        this.response = response.games;
        const games: Game[] = [];
        this.response.forEach((game: any) => {
          games.push({
            id: game.id,
            name: game.name,
            image: game.image,
            valoration: game.valoration,
            idCategory: game.Category.id,
            nameCategory: game.Category.name,
            idDeveloper: game.Developer.id,
            nameDeveloper: game.Developer.name,
            description: game.description,
            trailer: game.trailer,
            isAvailable: game.isAvailable,
            date: game.date,
            createdAt: game.createdAt,
            updatedAt: game.updatedAt,
          });
        });
        this.games = games;
        // Filtro personalizado (Nombre Juego, Desarrollador, Categoría)
        // this.dataSource.filterPredicate = (data, filter) => {
        // return (
        //   data.name.toLowerCase().includes(filter) ||
        // data.developer.toLowerCase().includes(filter) ||
        // data.category.toLowerCase().includes(filter)
        // );
        // };
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
