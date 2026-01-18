
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/category/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-category',
  standalone: true, 
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.css',
})
export class PopularCategoryComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  
  catList = this.categoriesService.categoriesSignal;

  catOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true, 
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: { items: 2 },
      400: { items: 3 },
      740: { items: 4 },
      940: { items: 6 } 
    },
    nav: false
  }

  ngOnInit(): void {
   
    if (this.catList().length === 0) {
      this.categoriesService.getAllCat();
    }
  }
}