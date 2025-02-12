import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  openedProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log('Produtos recebidos:', data);
      this.products = data;
    }, error => {
      console.error('Erro ao buscar produtos:', error);
    });
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');

    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  }
  
  toggleProductDetails(id: number): void {
    this.openedProductId = this.openedProductId === id ? null : id;
  }
}