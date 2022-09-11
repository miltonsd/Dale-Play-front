import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TableColumn } from '@dlp/shared/models';
import { Game } from '@dlp/games/models';
import { GamesService } from '@dlp/games/services';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@dlp/shared/components';

@Component({
  selector: 'dlp-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];
  response: any;

  gamesTableColumns: TableColumn[] = [];

  constructor(
    private _gamesService: GamesService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

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
    });
  }

  onDelete(game: any) {
    this._gamesService.deleteGame(game.id).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '375px',
          data: {
            title: 'Eliminar Juego',
            msg: 'Se ha eliminado el juego ' + game.name + ' con éxito.',
          },
        });
        dialogRef.afterClosed().subscribe(() => {
          this._router.navigate(['/admin/games']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (err) => {
        this.dialog.open(DialogComponent, {
          width: '375px',
          data: {
            title: 'Eliminar Juego - Error',
            msg: err.error.msg,
          },
        });
      },
    });
  }
}
