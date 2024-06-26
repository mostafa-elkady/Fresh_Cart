import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _AuthService:AuthService, private _Router:Router, private _ToastrService:ToastrService){
    if(localStorage.getItem('userToken') !== null) {
      _Router.navigate(['/home']);
      this._ToastrService.success()
    }
  }
  isLoading:boolean=false;
  apiError:any="";
  //Form Structure
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,15}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,15}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  });

  handleRegister(registerForm: FormGroup) {
    this.isLoading= true
    console.log(registerForm.value);
    if(registerForm.valid) {
      //
      localStorage.setItem("username",registerForm.value.name);
      this._AuthService.userName.next(registerForm.value.name);
      //
      this._AuthService.register(registerForm.value).subscribe({
        next:(res) => {
          if(res.message === "success") {
            this.isLoading= false
            this._Router.navigate(['/login'])
          }
        },
        error:(err) => {
          this.isLoading=false;
          if (err.status === 409) {
            this.apiError = err.error.message;
            console.log(err);
          } else {
            this.apiError = err.error.errors.msg;
            console.log(err);
          }
        }
      })
    }
  }
  clearApiError() {
    this.apiError=""
  }
}
