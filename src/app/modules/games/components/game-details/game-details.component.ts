import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game!: Game;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _gamesService: GamesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Obtengo el id del juego por medio de la ruta
    const gameId = Number(this._activatedRoute.snapshot.paramMap.get('gameId'));
    // Busco el juego
    this._gamesService.getGame(gameId).subscribe({
      next: (response: any) => {
        this.game = response;
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
        this._router.navigate(['/store']);
      },
    });
  }
}
