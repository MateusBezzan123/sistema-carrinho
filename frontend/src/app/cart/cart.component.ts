import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../alert.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CurrencyPipe]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor( private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartData = localStorage.getItem('cart') || '[]';
    this.cartItems = JSON.parse(cartData);
    this.calculateTotal();
  }


  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  updateQuantity(item: any, event: any): void {
    let newQuantity = Number(event.target.value);

    if (newQuantity < 1) {
      this.removeItem(this.cartItems.indexOf(item));
    } else {
      item.quantity = newQuantity;
      this.saveCart();
    }
  }

  removeItem(index: number): void {
    try {
      this.cartItems.splice(index, 1);
      this.saveCart();
      this.alertService.addAlert('success', '✅ Produto removido do carrinho.');
    } catch (error) {
      this.alertService.addAlert('danger', '❌ Erro ao remover produto do carrinho.');
    }
  }
  
  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();

    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  }
}
