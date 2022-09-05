import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UsersService } from '@dlp/users/services';
import { AuthService } from '@dlp/auth/services';
import { GamesService } from '@dlp/games/services';
import { GameUser } from '@dlp/games/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DevelopersService } from '@dlp/devs/services';
import { CategoriesService } from '@dlp/categories/services';

@Component({
  selector: 'dlp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  games: GameUser[] = [];

  displayedColumns: string[] = [
    'image',
    'name',
    'developer',
    'category',
    'valoration',
    'acciones',
  ];

  dataSource!: MatTableDataSource<GameUser>;

  sortedData!: GameUser[];

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
    private _gamesService: GamesService,
    private _developersService: DevelopersService,
    private _categoriesService: CategoriesService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // Obtiene el id del usuario loggeado
    const userId = this._authService.getCurrentUserId();

    // Cargar el usuario
    this._usersService.getUser(userId).subscribe({
      next: (res: any) => {
        // Guardo la info del usuario
        this.user = {
          id: res.elemnt.id,
          name: res.elemnt.name,
          surname: res.elemnt.surname,
          email: res.elemnt.email,
          createdAt: res.elemnt.createdAt.slice(0, 10),
        };
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });

    // Busco los juegos que posee el usuario
    this._gamesService.getGamesByUser(userId).subscribe({
      next: (resGame: any) => {
        const games = resGame.games;

        // Itera en cada uno de los juegos
        games.forEach((game: any) => {
          // Busca el desarrollador del juego
          this._developersService.getDeveloper(game.idDeveloper).subscribe({
            next: (resDev: any) => {
              // Busca la categoría del juego
              this._categoriesService.getCategory(game.idCategory).subscribe({
                next: (resCat: any) => {
                  // Prepara los datos del juego
                  const juego = {
                    id: game.id,
                    name: game.name,
                    image: game.image,
                    developer: resDev.elemnt.name,
                    category: resCat.elemnt.name,
                    valoration: game.valoration,
                  };
                  // Guarda la info del juego en el array
                  this.games.push(juego);
                  // Crea los datos de la tabla
                  this.dataSource = new MatTableDataSource(this.games);
                  // Agrego para que se puedan ordenar los datos
                  this.dataSource.sort = this.sort;
                  // Filtro personalizado (Nombre Juego, Desarrollador, Categoría)
                  this.dataSource.filterPredicate = (data, filter) => {
                    return (
                      data.name.toLowerCase().includes(filter) ||
                      data.developer.toLowerCase().includes(filter) ||
                      data.category.toLowerCase().includes(filter)
                    );
                  };
                },
                error: (err) => {
                  console.error(
                    `Código de error ${err.status}: `,
                    err.error.msg
                  );
                },
              });
            },
            error: (err) => {
              console.error(`Código de error ${err.status}: `, err.error.msg);
            },
          });
        });
      },
      error: (err) => {
        console.error(`Código de error ${err.status}: `, err.error.msg);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
