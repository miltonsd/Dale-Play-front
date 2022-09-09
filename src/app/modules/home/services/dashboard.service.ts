import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}
  getMetrics() {
    return this._http.get(`${environment.apiUrl}/dashboard/`);
  }
}
