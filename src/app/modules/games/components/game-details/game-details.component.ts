import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

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
    this._activatedRoute.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;

      // Cargar el juego
      this._gamesService.getGame(params.gameId).subscribe({
        next: (res: any) => {
          this.game = res.elemnt;
        },
        error: (err) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
          this._router.navigate(['/store']);
        },
      });
    });
  }
}
