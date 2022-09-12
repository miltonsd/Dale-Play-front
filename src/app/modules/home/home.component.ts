import { Component, OnInit } from '@angular/core';

import { Game } from '@dlp/games/models';
import { GamesService } from '../games/services/games/games.service';

@Component({
  selector: 'dlp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  response: any;

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {
    this._gamesService.getGames().subscribe({
      next: (response: any) => {
        this.response = response;
        const games: Game[] = [];
        this.response.forEach((game: any) => {
          if (!game.isAvailable) {
            games.push(game);
          }
        });
        this.games = games;
      },
    });
  }
}
