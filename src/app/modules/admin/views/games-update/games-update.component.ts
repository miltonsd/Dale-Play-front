import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@dlp/categories/models';
import { CategoriesService } from '@dlp/categories/services';
import { Developer } from '@dlp/devs/models';
import { DevelopersService } from '@dlp/devs/services';
import { Game } from '@dlp/games/models';
import { DialogComponent } from '@dlp/shared/components';
import { GamesService } from '../../../games/services/games/games.service';

@Component({
  selector: 'dlp-games-update',
  templateUrl: './games-update.component.html',
  styleUrls: ['./games-update.component.css'],
})
export class GamesUpdateComponent implements OnInit {
  game!: Game;
  developers: Developer[] = [];
  categories: Category[] = [];

  isAvailableControl = new FormControl(true);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ],
    }),
    valoration: new FormControl('', {
      validators: [Validators.required],
    }),
    idCategory: new FormControl('', {
      validators: [Validators.required],
    }),
    idDeveloper: new FormControl('', {
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      validators: [Validators.required],
    }),
    trailer: new FormControl('', {
      validators: [Validators.required],
    }),
    isAvailable: this.isAvailableControl,
    date: new FormControl(new Date()),
  });

  constructor(
    private _gamesService: GamesService,
    private _categoriesService: CategoriesService,
    private _developersService: DevelopersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog
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
    this._categoriesService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.elemts;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._developersService.getDevelopers().subscribe({
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
        name: this.form.value.name,
        image:
          this.form.value.image ||
          'https://via.placeholder.com/2000x2000.png?text=Placeholder+Game+Cover',
        valoration: this.form.value.valoration,
        idCategory: this.form.value.idCategory,
        idDeveloper: this.form.value.idDeveloper,
        description: this.form.value.description,
        trailer: this.form.value.trailer,
        isAvailable: this.form.value.isAvailable,
        date: this.form.value.date?.toISOString().split('T')[0],
      };
      this._gamesService.updateGame(this.game.id, game).subscribe({
        next: (response: any) => {
          console.log(response.msg);
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            data: {
              title: 'Editar juego',
              msg: game.name + ' ' + response.msg + ' con éxito.',
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this._router.navigate(['/admin/games']);
          });
        },
        error: (err) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            data: {
              title: 'Editar juego',
              msg: err.error.msg,
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.form.reset();
          });
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
