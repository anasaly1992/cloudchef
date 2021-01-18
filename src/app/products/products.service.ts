import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  status = "";
  editProduct = {};
  index = null;
  products: any[] = [
    {
      "name": "Product 1",
      "description": "Product 1 description",
      "quantity": 3,
      "expire_date": "2021-01-30"
    },
    {
      "name": "Product 2",
      "description": "Product 2 description",
      "quantity": 13,
      "expire_date": "2020-12-28"
    }
  ]
  isFormVisible = new Subject<boolean>();
  submitData = new Subject<boolean>();

  product = {}

  constructor(
    private http: HttpClient
  ) { }

  public getJSON(): Observable<any> {
    return this.http.get("../../assets/products.json");
  }
}
