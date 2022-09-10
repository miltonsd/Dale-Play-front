import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriesService } from '@dlp/categories/services';
import { Category } from '@dlp/categories/models';

@Component({
  selector: 'dlp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: Game[] = [];
  categories: Category[] = [];
  categoryFiltered!: NgModel;

  dataSource!: MatTableDataSource<any>;
  isShowing!: boolean;

  constructor(
    private _gamesService: GamesService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.cargarJuegos();
    this._categoriesService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.elemts;
      },
      error: (err: any) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }

  cargarJuegos() {
    // Busca los juegos para cargarlos en la tienda
    this._gamesService.getGames().subscribe({
      next: (response: any) => {
        this.games = response;
      },
      error: (err: any) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.games);
        this.dataSource.filterPredicate = (data, filter) => {
          return data.name.toLowerCase().includes(filter);
        };
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  categoryFilter(categoryId: number) {
    if (categoryId === 0) {
      this.cargarJuegos();
    } else {
      // const categoryId = 1;
      this._categoriesService.getGames(categoryId).subscribe({
        next: (response: any) => {
          console.log(response);
          this.games = response.games;
          // this.categories = response.elemts;
        },
        error: (err: any) => {
          console.error(`Código de error ${err.status}: `, err.error.msg);
        },
        complete: () => {
          this.dataSource = new MatTableDataSource(this.games);
          this.dataSource.filterPredicate = (data, filter) => {
            return data.name.toLowerCase().includes(filter);
          };
        },
      });
    }

    // this.dataSource.filterPredicate = (data, filter) => {
    //   return data.name.toLowerCase().includes(filter);
    // };
  }
}
