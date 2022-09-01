import { Component, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service';
import { Game } from '../../models/game';

@Component({
  selector: 'dlp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: Game[] = [];

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {
    // Cargar los juegos en la tienda
    this._gamesService.getGames().subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }
}
