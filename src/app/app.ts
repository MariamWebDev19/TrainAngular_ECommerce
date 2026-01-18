import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from "./sheard/components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
  
    ngOnInit(): void {
     initFlowbite();
     
   }
}
