import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-nav-main",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./nav-main.component.html",
  styleUrls: ["./nav-main.component.css"],
})
export class NavMainComponent implements OnInit {
  isLogin: boolean = false;
  cartnum: number = 0;
  wishnum: number = 0;
  cartId: any = "";
  username: string | null = "";
  constructor(
    private _AuthService: AuthService,
    private _Renderer2: Renderer2,
    private _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartnum = data;
      },
    });
    this._CartService.wishlistNumber.subscribe({
      next: (data) => {
        this.wishnum = data;
      },
    });

    if (this.cartnum > 0) {
      this._CartService.getUserCart().subscribe({
        next: (response) => {
          this.cartnum = response.numOfCartItems;
        },
      });
    }
    this._CartService.cartId.subscribe({
      next: (data) => {
        this.cartId = data;
      },
    });
    this._AuthService.userName.subscribe({
      next: (data) => {
        this.username = data;
      },
    });

    //Navbar icon handle
    this._Renderer2.listen('body', 'click', ()=> {
      const nav = document.querySelector(".navbar-collapse");
      if(nav?.classList.contains('show')) {
        this._Renderer2.removeClass(nav, 'show')
      }
    })
  }
  logOut() {
    this._CartService.emptyCart().subscribe({
      next: (response) => {
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
    });
    this._AuthService.logOut();
  }

  toggleMode() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
  }
}
