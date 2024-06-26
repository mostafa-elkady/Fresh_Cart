import { Component } from "@angular/core";
import { CommonModule, NgIf } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ForgetPasswordService } from "src/app/services/forget-password.service";

ForgetPasswordService;
@Component({
  selector: "app-frogot-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class FrogotPasswordComponent {
  constructor(
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _ForgetPasswordService: ForgetPasswordService
  ) {}
  isLoading: boolean = false;
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email:string='';
  //Start sendEmail Form
  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  handlesendEmailForm(sendEmailForm: FormGroup) {
    this._ForgetPasswordService.forgotPassword(sendEmailForm.value).subscribe({
      next: (response) => {
        if (response.statusMsg === "success") {
          console.log(response);
          console.log(sendEmailForm.value);
          this._ToastrService.success(response.message);
          this.step1 = false;
          this.step2 = true;
          this.isLoading = false;
          this.email = sendEmailForm.value.email
          console.log(this.email);
        }
      },
      error: (error) => {
        this._ToastrService.success(error.error.message);
      },
    });
  }

  // End Send Email

  //Start resetCode Form
  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  handleresetCodeForm(resetCodeForm: FormGroup) {
    this._ForgetPasswordService.resetCode(resetCodeForm.value).subscribe({
      next: (response) => {
          console.log(response);
          this._ToastrService.success('Plaese Enter New Password');
          this.step2 = false;
          this.step3 = true;
          this.isLoading = false;
      },
      error: (error) => {
        this._ToastrService.success(error.error.message);
    
      },
    });
  }


  // End resetCode
  //Start resetPasword Form
  resetpasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null,  [Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,15}$/)]),
  });

  handleresetpasswordForm() :void{
    let resetForm= this.resetpasswordForm.value;
    resetForm.email = this.email
    console.log(resetForm);
    this._ForgetPasswordService.resetPassword(resetForm).subscribe({
      next:(response) => {
        console.log(response);

        if(response?.token) {
          localStorage.setItem("userToken", response.token);
          this._ToastrService.success('Welcome Back again ');
          this._Router.navigate(['home'])
        }

      }
    })
  }
  // End resetpassword
}

