import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CurrencyPipe]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor() { }

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
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();

    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
  }
}
