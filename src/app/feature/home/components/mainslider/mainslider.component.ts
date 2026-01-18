import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mainslider',
  imports: [CarouselModule],
  templateUrl: './mainslider.component.html',
  styleUrl: './mainslider.component.css',
})
export class MainsliderComponent {
  mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag:true ,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],

    items:1,
    nav: true

  }
}
