import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
// import { log } from 'console';
import { Product } from '../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { MainsliderComponent } from './components/mainslider/mainslider.component';
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { PopularProductComponent } from './components/popular-product/popular-product.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,  MainsliderComponent, PopularCategoryComponent , PopularProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {

}

