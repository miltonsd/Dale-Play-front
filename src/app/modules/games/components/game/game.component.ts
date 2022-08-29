import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dlp-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    console.log('Click');
  }
}
