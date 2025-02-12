import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedProducts: any[] = [];
  searchTerm: string = '';
  openedProductId: number | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalPages: number = 1;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log('Produtos recebidos:', data);
      this.products = data;
      this.filteredProducts = data;
      this.updatePagination();
    }, error => {
      console.error('Erro ao buscar produtos:', error);
    });
  }

  filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.displayedProducts = this.filteredProducts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
    
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  }

  goToProductDetails(id: number): void {
    this.router.navigate(['/product', id]); 
  }
}
