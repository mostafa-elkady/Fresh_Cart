import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class productsService {
baseUrl:string= "https://ecommerce.routemisr.com/api/v1/"
  constructor(private _HttpClient: HttpClient) { }
  getCategories():Observable<any>{
   return this._HttpClient.get(this.baseUrl + `categories`);
  }

  // getAllProducts():Observable<any>{
  //  return this._HttpClient.get(this.baseUrl + `products`);
  // }
  getAllProducts(pageNum:number = 1):Observable<any>{
   return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`);
  }
  getAllBrands():Observable<any>{
   return this._HttpClient.get(this.baseUrl + `brands`);
  }
  getSpecificProducts(id:string |null):Observable<any>{
   return this._HttpClient.get(this.baseUrl + `products/${id}`);
  }
  
}
