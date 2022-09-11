import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Game } from '@dlp/games/models';
import { GamesService, UserGamesService } from '@dlp/games/services';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@dlp/shared/components';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  games: Game[] = [];
  trailer: any;

  constructor(
    private _gamesService: GamesService,
    private _userGamesService: UserGamesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Obtengo el id del juego por medio de la ruta
    const gameId = Number(this._activatedRoute.snapshot.paramMap.get('gameId'));
    // Busco el juego
    this._gamesService.getGame(gameId).subscribe({
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

  addToLibrary() {
    this._userGamesService.addUserGame(this.game.id).subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '375px',
          data: {
            title: 'Éxito al comprar ' + this.game.name,
            msg:
              res.msg + '. Se envió un correo con el comprobante de su compra.',
          },
        });
        dialogRef.afterClosed().subscribe(() => {
          this._router.navigate(['/profile']);
        });
      },
      error: (err) => {
        this.dialog.open(DialogComponent, {
          width: '375px',
          data: {
            title: 'Error al comprar ' + this.game.name,
            msg: err.error.msg,
          },
        });
      },
    });
  }
}
