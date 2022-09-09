import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@dlp/auth/services';

@Component({
  selector: 'dlp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
