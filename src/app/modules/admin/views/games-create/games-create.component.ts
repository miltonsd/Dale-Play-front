import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '@dlp/categories/models';
import { CategoriesService } from '@dlp/categories/services';
import { Developer } from '@dlp/devs/models';
import { DevelopersService } from '@dlp/devs/services';
import { GamesService } from '../../../games/services/games/games.service';

@Component({
  selector: 'dlp-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css'],
})
export class GamesCreateComponent implements OnInit {
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
      validators: [Validators.required, Validators.pattern('[1-5]')],
    }),
    idCategory: new FormControl(''),
    idDeveloper: new FormControl(''),
  });

  constructor(
    private _gamesService: GamesService,
    private _categoriesService: CategoriesService,
    private _developersService: DevelopersService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._developersService.getDevelopers().subscribe({
      next: (resDev: any) => {
        this.developers = resDev.elemts;
      },
    });
    this._categoriesService.getCategories().subscribe({
      next: (resCat: any) => {
        this.categories = resCat.elemts;
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const game = {
        name: this.form.value.name,
        image:
          'https://via.placeholder.com/2000x2000.png?text=Placeholder+Game+Cover',
        valoration: this.form.value.valoration,
        idCategory: this.form.value.idCategory,
        idDeveloper: this.form.value.idDeveloper,
        description: this.form.value.description,
      };
      this._gamesService.createGame(game).subscribe({
        next: (res: any) => {
          console.log(res);

          // console.log(res.msg);
        },
        error: (err) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
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
