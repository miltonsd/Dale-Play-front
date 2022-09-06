import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@dlp/categories/models';
import { CategoriesService } from '@dlp/categories/services';
import { Developer } from '@dlp/devs/models';
import { DevelopersService } from '@dlp/devs/services';
import { Game } from '@dlp/games/models';
import { GamesService } from '../../services/games/games.service';

@Component({
  selector: 'dlp-games-update',
  templateUrl: './games-update.component.html',
  styleUrls: ['./games-update.component.css'],
})
export class GamesUpdateComponent implements OnInit {
  game!: Game;
  developers: Developer[] = [];
  categories: Category[] = [];

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    valoration: new FormControl('', {
      validators: [Validators.required, Validators.pattern('[0-9]*')],
    }),
    idCategory: new FormControl(''),
    idDeveloper: new FormControl(''),
  });

  constructor(
    private _gamesService: GamesService,
    private _categoriesService: CategoriesService,
    private _developersService: DevelopersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gameId = Number(this._activatedRoute.snapshot.paramMap.get('gameId'));
    this._gamesService.getGame(gameId).subscribe({
      next: (response: any) => {
        this.game = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.elemts;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._developersService.getAllDevelopers().subscribe({
      next: (response: any) => {
        this.developers = response.elemts;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const game = {
        name: this.form.value.name || this.game.name,
        image: this.game.image,
        valoration: this.form.value.valoration || this.game.valoration,
        idCategory: this.form.value.idCategory || this.game.idCategory,
        idDeveloper: this.form.value.idDeveloper || this.game.idDeveloper,
        description: this.form.value.description || this.game.description,
      };
      console.log(game);

      this._gamesService.updateGame(this.game.id, game).subscribe({
        next: (response: any) => {
          console.log(response.msg);
        },
        error: (err) => {
          console.error(
            `Código de error ${err.status}: `,
            err.error.errors[0].msg
          );
        },
        complete: () => {
          this._router.navigate(['/admin/games']);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
