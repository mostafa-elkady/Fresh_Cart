import { Component, OnInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "src/app/services/cart.service";
import { ToastrService } from "ngx-toastr";
import { RouterLink } from "@angular/router";
// import { BehaviorSubject } from "rxjs";
@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  cart: any = null;
  cartId:any=''
  cartProducts: any[] = [];
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        console.log(response);
        this.cartProducts = response.data.products;
        this._CartService.cartNumber.next(response.numOfCartItems);
       this.cartId= this._CartService.cartId.next(response.data._id);
      },
    });
  }

  // remove cart item
  removecartItem(id: string, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, "disabled", "true");
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this._ToastrService.success("item has been Removed");
        this._Renderer2.removeAttribute(element, "disabled");
        this.cart = response.data;
        this.cartProducts = response.data.products;
        this._CartService.cartNumber.next(response.numOfCartItems);
        if (this.cart.totalCartPrice === 0) {
          this.emptyCart(id);
        }
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, "disabled");
      },
    });
  }

  // Update Count
  updateCount(
    count: number,
    id: string,
    btn1: HTMLButtonElement,
    btn2: HTMLButtonElement
  ): void {
    if (count >= 1) {
      this._Renderer2.setAttribute(btn1, "bisabled", "true");
      this._Renderer2.setAttribute(btn2, "bisabled", "true");
      this._CartService.updateCount(id, count).subscribe({
        next: (response) => {
          this.cart = response.data;
          this.cartProducts = response.data.products;
          this._Renderer2.removeAttribute(btn1, "disabled");
          this._Renderer2.removeAttribute(btn2, "disabled");
          this._ToastrService.success("item count has been changed");
          this._CartService.cartNumber.next(response.numOfCartItems);
        },
        error: () => {
          this._Renderer2.removeAttribute(btn1, "disabled");
          this._Renderer2.removeAttribute(btn2, "disabled");
        },
      });
    }
  }

  // Empty Cart
  emptyCart(id: string) {
    this._CartService.emptyCart().subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
        if (response.message === "success") {
          this.cart = null;
        }
      },
    });
  }
}
