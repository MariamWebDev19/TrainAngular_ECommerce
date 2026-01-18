// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CategoriesService } from '../../core/services/category/categories.service';
// import { Category } from '../../core/models/category.interface';

// @Component({
//   selector: 'app-categories',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './categories.component.html',
//   styleUrls: ['./categories.component.css'],
// })
// export class CategoriesComponent implements OnInit {
//   private readonly categoriesService = inject(CategoriesService);
//   catList: Category[] = [];

//   ngOnInit(): void {
//     this.getAllCat();
//   }

//   getAllCat(): void {
//     this.categoriesService.getAllCat().subscribe({
//       next: (res) => {
//         this.catList = res.data;
//       },
//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }
// }


import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/category/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [], 
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

 
  catList = this.categoriesService.categoriesSignal;

  ngOnInit(): void {
    
    this.categoriesService.getAllCat();
  }
}