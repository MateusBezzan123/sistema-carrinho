import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;
      }, error => {
        this.alertService.addAlert('danger', '❌ Erro ao carregar detalhes do produto.');
        this.router.navigate(['/']);
      });
    } else {
      this.alertService.addAlert('danger', '❌ Produto não encontrado.');
      this.router.navigate(['/']);
    }
  }
  

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
  }
}