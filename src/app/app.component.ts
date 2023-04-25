import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'fs-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-foodscore';
}
