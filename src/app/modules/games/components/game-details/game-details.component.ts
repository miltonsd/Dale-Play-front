import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GamesService } from '@dlp/games/services';
import { DevelopersService } from '@dlp/devs/services';
import { CategoriesService } from '@dlp/categories/services';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game: any = {};
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _gamesService: GamesService,
    private _developersService: DevelopersService,
    private _categoriesService: CategoriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Cargar el juego
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params['gameId']) {
        this._gamesService.getGame(params['gameId']).subscribe({
          next: (res: any) => {
            this._developersService
              .getDeveloper(res.elemnt.idDeveloper)
              .subscribe({
                next: (resDev: any) => {
                  this._categoriesService
                    .getCategory(res.elemnt.idCategory)
                    .subscribe({
                      next: (resCat: any) => {
                        this.game = {
                          id: res.elemnt.id,
                          name: res.elemnt.name,
                          description: res.elemnt.description,
                          image: res.elemnt.image,
                          developer: resDev.elemnt.name,
                          category: resCat.elemnt.name,
                          valoration: res.elemnt.valoration,
                          createdAt: res.elemnt.createdAt,
                          updateAt: res.elemnt.updatedAt,
                        };
                      },
                      error: (err) => {
                        console.error(
                          `Código de error ${err.status}: `,
                          err.error.msg
                        );
                        this._router.navigate(['/store']);
                      },
                    });
                },
                error: (err) => {
                  console.error(
                    `Código de error ${err.status}: `,
                    err.error.msg
                  );
                  this._router.navigate(['/store']);
                },
              });
          },
          error: (err) => {
            console.error(`Código de error ${err.status}: `, err.error.msg);
            this._router.navigate(['/store']);
          },
        });
      }
    });
  }
}
