import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router ,private _ToastrService:ToastrService){
    if(localStorage.getItem('userToken') !== null) {
      _Router.navigate(['/home'])
    }
  }
  isLoading:boolean=false;
  apiError:any=null;
  username!:string|null;
  //Form Structure
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,15}$/)]),
  });

  handleLogin(loginForm: FormGroup) {
   this.isLoading= true
    if(loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next:(res) => {
          if(res.message === "success") {
            this.isLoading= false
            localStorage.setItem("userToken",res.token);
            this._AuthService.decodeUserData();
            this._AuthService.userName.subscribe({
              next:(data)=> {
                this.username=data;
                if(this.username !== null) {
                  this._ToastrService.success(` welcome ${this.username}`)
                 }else {
                  this._ToastrService.success(` welcome Back`)
                 }
              }
            })
            this._Router.navigate(['/home']);

          }
        },
        error:(err) => {
          this.isLoading= false
          this.apiError = err.error.message
        }
      })
    }
  }
  clearApiError() {
    this.apiError = null;
  }
}
