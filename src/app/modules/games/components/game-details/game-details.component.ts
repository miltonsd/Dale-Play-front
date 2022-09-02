import { Component, OnInit } from '@angular/core';

import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'dlp-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css'],
})
export class GameDetailsComponent implements OnInit {
  game!: Game;
  games: Game[] = [];

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {}
}
