import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMainComponent } from 'src/app/components/nav-main/nav-main.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, NavMainComponent, FooterComponent, RouterOutlet, ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

}
