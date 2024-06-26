import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAuthComponent } from 'src/app/components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,NavAuthComponent, RouterOutlet, FooterComponent,],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
constructor(private _LoadingService:LoadingService) {

}
}
