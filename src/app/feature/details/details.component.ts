// import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
private readonly activatedRoute= inject(ActivatedRoute)
private readonly productDetailsService= inject(ProductDetailsService)

id:string | null = null;
prdDetails:Product ={} as Product;
ngOnInit(): void {
  this.getPrdId();
  this.getProductDetailsData();
}


getPrdId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(urlPrams)=>{
      this.id = urlPrams.get('id');
      
    },
  });
}

getProductDetailsData():void{
  this.productDetailsService.getProductDetails(this.id).subscribe({
    next:(res)=>{
console.log(res.data)
this.prdDetails= res.data
    },
    error:(err)=>{
    console.log(err)
    }
  })

}
}
