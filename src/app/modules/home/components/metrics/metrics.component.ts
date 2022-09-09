import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dlp-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  @Input() digit!: number;
  @Input() duration!: number;

  constructor() {}

  ngOnInit(): void {}
}
