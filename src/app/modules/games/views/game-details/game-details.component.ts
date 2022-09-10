import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { GamesService, UserGamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';
import { UsersService } from '@dlp/users/services';
import { AuthService } from '@dlp/auth/services';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  games: Game[] = [];
  gameId!: number;
  trailer: any;

  constructor(
    private _gamesService: GamesService,
    private _userGames: UserGamesService,
    private _usersService: UsersService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Obtengo el id del juego por medio de la ruta
    this.gameId = Number(this._activatedRoute.snapshot.paramMap.get('gameId'));
    // Busco el juego
    this._gamesService.getGame(this.gameId).subscribe({
      next: (response: any) => {
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

  hasGame() {
    const userId = this._authService.getCurrentUserId();
    this._usersService.getUserGames(userId).subscribe({
      next: (response: any) => {
        const games = response.games;
        if (games.find((game: any) => this.gameId === game.id)) {
          return true;
        } else {
          return false;
        }
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }

  addToLibrary() {
    this._userGames.addUserGame(this.game.id).subscribe({
      next: (res: any) => {
        console.log(res.msg);
        this._router.navigate(['/profile']);
      },
      error: (err) => {
        console.log(err.msg);
        this._router.navigate(['/store']);
      },
    });
  }
}
