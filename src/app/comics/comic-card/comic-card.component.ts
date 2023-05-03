import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comic } from '../interfaces/comics';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ml-comic-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss']
})
export class ComicCardComponent {
  @Input() comic!:Comic ;
}
