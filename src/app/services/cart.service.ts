import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "./auth.service";
AuthService;
@Injectable({
  providedIn: "root",
})
export class CartService {
  //properties********
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  wishlistNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  cartId = new BehaviorSubject("");
  userId = this._AuthService.userId;
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/`;

  //propertites***********

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {}


  // Add Product To cart
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`, {
      productId: productId,
    });
  }

  // get The user cart
  getUserCart(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `cart`);
  }
  // remove cart item
  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${productId}`);
  }
  /********************* start wishlist***************** */
  // Add Product To wishlist
  addToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`, {
      productId: productId,
    });
  }
  // get The user cart
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`);
  }
  // remove cart item
  removeWishlistItem(productId: string|undefined): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${productId}`);
  }

  /************************* End wishlist************* */

  // Update count items
  updateCount(productId: string, countNum: number): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${productId}`, {
      count: countNum,
    });
  }
  // empty cart
  emptyCart(): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`);
  }

  // payment checkout
  checkout(cartId: string | null, userInfo: object): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl +
        `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddres: userInfo,
      }
    );
  }

  // All Orders
  allorders(): Observable<any> {
    console.log(this.userId);
    return this._HttpClient.get(this.baseUrl + `orders/user/${this.userId}`);
  }
}
