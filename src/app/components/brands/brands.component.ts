import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productsService } from 'src/app/services/products.service';
import { Brand } from 'src/app/interfaces/product';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  Brands: Brand[] = [];
constructor(private _productsService:productsService){

}
ngOnInit(): void {
  this.getAllBrands()
}

getAllBrands() {
  this._productsService.getAllBrands().subscribe({
    next:(response: { data: any[]; })=>{ 
      console.log(response.data);
      this.Brands = response.data }
  })
}
}
