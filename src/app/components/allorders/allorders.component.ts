import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-allorders",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./allorders.component.html",
  styleUrls: ["./allorders.component.css"],
})
export class AllordersComponent {
  userId: string = "";
  allorders: any = [];
  constructor(private _CartService: CartService) {
    this._CartService.allorders().subscribe({
      next: (response) => {
        this.allorders = response;
      },

    });
  }
}
