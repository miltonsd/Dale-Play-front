import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'dlp-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService.getMetrics().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
