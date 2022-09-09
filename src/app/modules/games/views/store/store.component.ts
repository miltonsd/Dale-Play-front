import { Component, OnInit } from '@angular/core';

import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';

@Component({
  selector: 'dlp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: Game[] = [];

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {
    // Busca los juegos para cargarlos en la tienda
    this._gamesService.getGames().subscribe({
      next: (response: any) => {
        console.log(response);

        this.games = response;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
