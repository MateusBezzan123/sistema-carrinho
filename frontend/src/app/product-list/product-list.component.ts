import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../alert.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AlertComponent], 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedProducts: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalPages: number = 1;

  constructor(private productService: ProductService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.isLoading = false;
      this.products = data;
      this.filteredProducts = data;
      this.updatePagination();
    }, error => {
      this.isLoading = false;
      this.alertService.addAlert('danger', 'Erro ao buscar produtos. Tente novamente mais tarde.');
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
    try {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      this.alertService.addAlert('success', '✅ Produto adicionado ao carrinho!');
      const event = new CustomEvent('cartUpdated');
      window.dispatchEvent(event);
    } catch (error) {
      this.alertService.addAlert('danger', '❌ Erro ao adicionar produto ao carrinho.');
    }
  }

  goToProductDetails(id: number): void {
    this.router.navigate(['/product', id]); 
  }
}
