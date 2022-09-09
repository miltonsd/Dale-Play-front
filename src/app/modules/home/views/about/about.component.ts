import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'dlp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  counter!: any;
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService.getMetrics().subscribe({
      next: (response: any) => {
        console.log(response);
        this.counter = response;
        // console.log(response.length);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
