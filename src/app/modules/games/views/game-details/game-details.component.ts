import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  trailer: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _gamesService: GamesService,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Obtengo el id del juego por medio de la ruta
    const gameId = Number(this._activatedRoute.snapshot.paramMap.get('gameId'));
    // Busco el juego
    this._gamesService.getGame(gameId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.game = {
          id: response.id,
          name: response.name,
          image: response.image,
          valoration: response.valoration,
          nameCategory: response.Category.name,
          nameDeveloper: response.Developer.name,
          description: response.description,
          trailer: response.trailer,
          isAvailable: response.isAvailable,
          date: response.date,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        this.trailer = this._sanitizer.bypassSecurityTrustHtml(
          this.game.trailer
        );
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
        this._router.navigate(['/store']);
      },
    });
  }

  addToLibrary() {
    this._gamesService.addGameToUser(this.game.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this._router.navigate(['/profile']);
      },
      error: (err) => {
        console.error(err);
        this._router.navigate(['/store']);
      },
    });
  }
}
