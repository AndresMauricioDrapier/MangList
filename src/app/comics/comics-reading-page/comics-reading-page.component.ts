import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideButtonComponent } from "../../shared/slide-button/slide-button.component";

@Component({
    selector: 'ml-comics-reading-page',
    standalone: true,
    templateUrl: './comics-reading-page.component.html',
    styleUrls: ['./comics-reading-page.component.scss'],
    imports: [CommonModule, SlideButtonComponent]
})
export class ComicsReadingPageComponent {

  images = [
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
    'assets/utiles/panelManga.png',
  ];

  goBack() {
    console.log('goBack');
  }

  goNext() {
    console.log('goNext');
  }
}
