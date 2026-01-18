import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../sheard/components/card/card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  prdList = this._productsService.productsSignal;

  ngOnInit(): void {
    if (this.prdList().length === 0) {
      this._productsService.getAllPrd();
    }
  }
}
