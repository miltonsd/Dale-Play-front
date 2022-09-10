import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Game } from '@dlp/games/models';
import { GamesService } from '@dlp/games/services';

@Component({
  selector: 'dlp-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  games: Game[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'developer',
    'category',
    'valoration',
    'acciones',
  ];

  dataSource!: MatTableDataSource<Game>;

  constructor(private _gamesService: GamesService, private _router: Router) {}

  ngOnInit(): void {
    // Busca los juegos
    this._gamesService.getGames().subscribe({
      next: (response: any) => {
        this.games = response;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
      complete: () => {
        // Carga los juegos en la tabla
        this.dataSource = new MatTableDataSource(this.games);
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
