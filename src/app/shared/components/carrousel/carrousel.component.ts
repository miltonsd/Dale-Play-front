import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dlp-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {
  @Input() games: any[] = [];
  @Input() indicators = true;
  @Input() controls = true;

  selectedIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.games.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.games.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
