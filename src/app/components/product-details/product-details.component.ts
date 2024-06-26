import { Component, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { productsService } from "src/app/services/products.service";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { CommonModule } from '@angular/common';
import { CartService } from "src/app/services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productId!:string |null;
  productDetails: any= {};
  isLoading: boolean = false;
  constructor(
    private _productsService: productsService,
    private _ActivatedRoute: ActivatedRoute,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe( {
      next:(params) => {
        this.productId = params.get("id")
      }
    });
    this._productsService.getSpecificProducts(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
      error: (err) => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }
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
  // Carousel
  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:5000,
    navSpeed: 900,
    responsive: {
      0: {
        items: 1,
      },
    },

  };
}
