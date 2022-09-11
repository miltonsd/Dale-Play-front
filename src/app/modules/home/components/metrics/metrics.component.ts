import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dlp-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  @Input() digit!: number;

  constructor() {}

  count: number = 0;

  countStop: any = setInterval(() => {
    this.count++;
    if (this.count === this.digit) {
      clearInterval(this.countStop);
    }
  }, 100);

  ngOnInit(): void {}
}
