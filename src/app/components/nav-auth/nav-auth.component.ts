import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent {
  isLogin:boolean= false;
  constructor(private _AuthService:AuthService , private _Renderer2:Renderer2 , private _CartService:CartService){

  }
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () =>{
        if(this._AuthService.userData.getValue() !== null) {
      this.isLogin = true
        }else {
          this.isLogin = false
        }
      }
    })
        //Navbar icon handle
        this._Renderer2.listen('body', 'click', ()=> {
          const nav = document.querySelector(".navbar-collapse");
          if(nav?.classList.contains('show')) {
            this._Renderer2.removeClass(nav, 'show')
          }
        })
  }
  logOut() {
    this._AuthService.logOut()
  }

    toggleMode() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.toggle('dark-mode');
      body.classList.toggle('light-mode');
    }
}
