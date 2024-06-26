import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  cartId: string | null = "";
  isLoading:boolean=false;
  constructor(private _ActivatedRoute: ActivatedRoute, private _CartService:CartService) {} 

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get("cartId");
        console.log(this.cartId);
      },
    });
  }
// payment form
paymentForm: FormGroup = new FormGroup({
  details: new FormControl(null, [Validators.required]),
  phone: new FormControl(null, [Validators.required]),
  city: new FormControl(null, [Validators.required]),
});

handlePayment(paymentForm:FormGroup){
  this.isLoading= true
  console.log(this.paymentForm.value);
  this._CartService.checkout(this.cartId,this.paymentForm.value).subscribe({
    next:(response)=> {
      console.log(response);
      if(response.status==="success") {
        window.open(response.session.url,'_self')
      }
    },
    error:(err)=> {
      this.isLoading=false
    }
  })

}




}
