import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  product = {
    name: '',
    description: '',
    price: '',
    image: ''
  };
  isLoading = false;

  constructor(private router: Router, private alertService: AlertService) {}

  async submitForm() {
    if (!this.product.name || !this.product.description || !this.product.price) {
      this.alertService.addAlert('danger', '❌ Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    this.isLoading = true;
    
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.product),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto.');
      }

      this.alertService.addAlert('success', '✅ Produto cadastrado com sucesso!');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } catch (error) {
      this.alertService.addAlert('danger', '❌ Erro ao cadastrar produto. Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }
}
