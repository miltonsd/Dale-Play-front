import { Component, OnInit } from '@angular/core';

import { GamesService } from '@dlp/games/services';
import { Game } from '@dlp/games/models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dlp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  games: Game[] = [];
  dataSource!: MatTableDataSource<any>;

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {
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
}
