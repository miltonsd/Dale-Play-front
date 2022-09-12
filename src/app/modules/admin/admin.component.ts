import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dlp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isShowing!: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }
}
