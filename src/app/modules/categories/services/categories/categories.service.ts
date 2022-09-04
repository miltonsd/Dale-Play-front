import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private _http: HttpClient) {}

  getCategory(categoryId: number) {
    return this._http.get(`${environment.apiUrl}/category/${categoryId}`);
  }

  getAllCategories() {
    return this._http.get(`${environment.apiUrl}/category`);
  }

  createCategory(category: any) {
    return this._http.post(`${environment.apiUrl}/category`, category);
  }

  deleteCategory(categoryId: number) {
    return this._http.delete(`${environment.apiUrl}/category/${categoryId}`);
  }

  updateCategory(categoryId: number, category: any) {
    return this._http.patch(
      `${environment.apiUrl}/category/${categoryId}`,
      category
    );
  }
}
