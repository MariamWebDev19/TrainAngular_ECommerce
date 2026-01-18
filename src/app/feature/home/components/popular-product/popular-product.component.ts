// import { CommonModule } from '@angular/common';
// import { Component, inject, input, OnInit } from '@angular/core';
// import { CardComponent } from '../../../../sheard/components/card/card.component';
// import { Product } from '../../../../core/models/product.interface';
// import { ProductsService } from '../../../../core/services/products/products.service';

// @Component({
//   selector: 'app-popular-product',
//   imports: [CommonModule , CardComponent],
//   templateUrl: './popular-product.component.html',
//   styleUrl: './popular-product.component.css',
// })
// export class PopularProductComponent implements OnInit {
//  private readonly productsService = inject(ProductsService)
// prdList:Product[]=[]
// ngOnInit(): void {
//   this.getAllPrdData();
// }

// getAllPrdData():void{
//   this.productsService.getAllPrd().subscribe({
//     next:(res)=>{
//       console.log(res);
//       this.prdList = res.data
//     },
//     error:(err)=>{
//       console.log(err)
//     }
    
//   })
// }
// // }
// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { CardComponent } from '../../../../sheard/components/card/card.component';
// import { Product } from '../../../../core/models/product.interface';
// import { ProductsService } from '../../../../core/services/products/products.service';

// @Component({
//   selector: 'app-popular-product',
//   imports: [CommonModule , CardComponent],
//   templateUrl: './popular-product.component.html',
//   styleUrl: './popular-product.component.css',
// })
// export class PopularProductComponent implements OnInit {
//  private readonly productsService = inject(ProductsService)
// prdList:Product[]=[]
// ngOnInit(): void {
//   this.getAllPrdData();
// }

// getAllPrdData():void{
//   this.productsService.getAllPrd().subscribe({
//     next:(res)=>{
//       // console.log(res);
//       this.prdList = res.data
//     },
//     error:(err)=>{
//       console.log(err)
//     }
    
//   })
// }
// }
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../../sheard/components/card/card.component';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-product',
  standalone: true, // تأكدي إنها موجودة لو بتستخدمي Angular 17+
  imports: [CommonModule, CardComponent],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css',
})
export class PopularProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  // بدل ما بنعرف مصفوفة فاضية، بنربطها بالـ Signal اللي في الـ Service
  prdList = this.productsService.productsSignal;

  ngOnInit(): void {
    // بننادي الداتا، والـ Signal هيتحدث تلقائياً أول ما الداتا تيجي
    this.productsService.getAllPrd();
  }
}