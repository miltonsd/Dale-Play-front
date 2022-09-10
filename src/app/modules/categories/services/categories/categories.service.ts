import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = environment.apiUrl + '/categories';

  constructor(private _http: HttpClient) {}

  getCategory(categoryId: number) {
    return this._http.get(`${this.url}/${categoryId}`);
  }

  getCategories() {
    return this._http.get(`${this.url}/`);
  }

  createCategory(category: any) {
    return this._http.post(`${this.url}/`, category);
  }

  deleteCategory(categoryId: number) {
    return this._http.delete(`${this.url}/${categoryId}`);
  }

  updateCategory(categoryId: number, category: any) {
    return this._http.patch(`${this.url}/${categoryId}`, category);
  }

  getGames(categoryId: number) {
    return this._http.get(`${this.url}/${categoryId}/games`);
  }
}
