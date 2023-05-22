import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ml-slide-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent {

  // window.onscroll = function() {
  //   var y = window.scrollY;
  //   if(y > 300){
  //      $("#gotop").removeClass("go-top-displaynone");
  //   }else{
  //       $("#gotop").addClass("go-top-displaynone");
  //   }
  // //   document.getElementById('y').innerText = y;
  // };
  goTop() {
    window.scrollTo(0, 0);
  }
}
