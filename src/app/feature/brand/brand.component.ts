
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrabdsService } from './services/brabds.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  private readonly brabdsService = inject(BrabdsService);


  brandList = this.brabdsService.brandsSignal;

  ngOnInit(): void {
   
    this.brabdsService.getAllBrands();
  }
}
