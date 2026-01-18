import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../core/models/category.interface';
import { CategoriesService } from '../../../../core/services/category/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.css',
})
export class PopularCategoryComponent implements OnInit {

private readonly categoriesService =inject(CategoriesService)
catList:Category[]=[]
// /////////////////
 catOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
// //////////////////
ngOnInit(): void {
  this.getAllCat()
}
getAllCat():void{
  this.categoriesService.getAllCat().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.catList =res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
