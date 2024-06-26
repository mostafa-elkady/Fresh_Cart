import { Component, OnInit, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "../products/products.component";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { productsService } from "src/app/services/products.service";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CartService } from "src/app/services/cart.service";
import { FormsModule, NgModel } from "@angular/forms";
import { SearchPipe } from "src/app/pipes/search.pipe";
import { Product } from "src/app/interfaces/product";
import { Category } from "src/app/interfaces/category";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    ProductsComponent,
    CarouselModule,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  // Main Slider
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
    },
  };
  // CategorySlider
  categories: Category[] = [];
  allProducts: Product[] = [];
  wishlistData: string[] = [];
  searchWord: string = "";
  constructor(
    private _productsService: productsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {
    // Do not Write in constructor
  }
  ngOnInit(): void {
    this._productsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
    this._productsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
    });
    this._CartService.getUserWishlist().subscribe({
      next: (response) => {
       const newData= response.data.map((item:any)=> {
      return  item._id
  
       }) 
       this.wishlistData= newData;
      },
    });
  
    // }

  }

   // Add To wishList
  addToWishlist(productId: string, element:HTMLElement ) {
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
  this._CartService.addToCart(productId).subscribe({
    next: (response) => {
      this._ToastrService.success(response.message);
      this._CartService.cartNumber.next(response.numOfCartItems);
    },
  });
}
  // slider
  categorySlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },

      900: {
        items: 4,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 7,
      },
    },
  };
}
