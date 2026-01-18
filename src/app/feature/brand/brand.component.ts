
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brands } from '../../core/models/brands.interface';
import { BrabdsService } from './services/brabds.service';

@Component({
  selector: 'app-brand',
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {

  private readonly brabdsService = inject(BrabdsService);
  brandList: Brands[] = [];

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand(): void {
    this.brabdsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandList = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
