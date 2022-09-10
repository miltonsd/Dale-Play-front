import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TableColumn } from '@dlp/shared/models';
import { Game } from '@dlp/games/models';
import { GamesService } from '@dlp/games/services';

@Component({
  selector: 'dlp-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  response: any;

  gamesTableColumns: TableColumn[] = [];

  constructor(private _gamesService: GamesService, private _router: Router) {}

  ngOnInit(): void {
    this.gamesTableColumns = [
      { name: 'ID', dataKey: 'id', isSortable: true },
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
        editButton: true,
        editUrl: '/admin/games/edit/',
        deleteButton: true,
        deleteUrl: '/admin/games/delete/',
      },
    ];

    // Busca los juegos
    this._gamesService.getGames().subscribe({
      next: (response: any) => {
        this.response = response;
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
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
      complete: () => {
        // Carga los juegos en la tabla
        // this.dataSource = new MatTableDataSource(this.games);
      },
    });
  }

  onDelete(gameId: number) {
    this._gamesService.deleteGame(gameId).subscribe({
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
