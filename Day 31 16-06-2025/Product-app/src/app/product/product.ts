import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  @Input() product: any;
  @Input() searchTerm = '';

  highlight(text: string): string {
    if (!this.searchTerm) return text;
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

}
