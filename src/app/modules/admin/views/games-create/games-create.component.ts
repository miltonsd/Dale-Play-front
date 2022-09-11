import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '@dlp/categories/models';
import { CategoriesService } from '@dlp/categories/services';
import { Developer } from '@dlp/devs/models';
import { DevelopersService } from '@dlp/devs/services';
import { DialogComponent } from '@dlp/shared/components';
import { GamesService } from '../../../games/services/games/games.service';

@Component({
  selector: 'dlp-games-create',
  templateUrl: './games-create.component.html',
  styleUrls: ['./games-create.component.css'],
})
export class GamesCreateComponent implements OnInit {
  developers: Developer[] = [];
  categories: Category[] = [];

  isAvailableControl = new FormControl(true);
  datePicker!: any;

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
    public dialog: MatDialog
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
      // const fecha = String(this.form.value.date);
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
      this._gamesService.createGame(game).subscribe({
        next: (res: any) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '375px',
            data: {
              title: 'Registrar juego',
              msg: game.name + ' ' + res.msg + ' con éxito.',
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
              title: 'Registrar juego',
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
