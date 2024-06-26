import { Component, NgModule, OnInit, Renderer2 } from "@angular/core";
import { productsService } from "src/app/services/products.service";
import { CartService } from "src/app/services/cart.service";
import { ToastrService } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { SearchPipe } from "src/app/pipes/search.pipe";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Product } from "src/app/interfaces/product";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    SearchPipe,
    NgxPaginationModule,
  ],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _productsService: productsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  allProducts: Product[] = [];
  searchWord: string = "";
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;
  wishlistData: string[] = [];
  ngOnInit(): void {
    this.getAllProducts();
    this._CartService.getUserWishlist().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => {
          return item._id;
        });
        this.wishlistData = newData;
      },
    });
  }
  //Get All Products
  getAllProducts(pageNum: number = 1) {
    this._productsService.getAllProducts(pageNum).subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }

  // Add To wishList
  addToWishlist(productId: string, element: HTMLElement) {
    this._CartService.addToWishlist(productId).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.setStyle(element, "color", "red");
        this._CartService.wishlistNumber.next(response.data.length)
        this.wishlistData= response.data;
      },
    });
  }
  // Add to cart
  addToCart(productId: string, element: HTMLButtonElement) {
    this._Renderer2.setAttribute(element, "disabled", "true");
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(element, "disabled");
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, "disabled");
      },
    });
  }
  // Pagination Method
  pageChanged(event: any): void {
    console.log(event);
    this.getAllProducts(event);
  }
}
