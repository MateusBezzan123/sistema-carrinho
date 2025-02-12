import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItemCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateCartCount();
    window.addEventListener('cartUpdated', () => this.updateCartCount());
  }

  updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.length;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}