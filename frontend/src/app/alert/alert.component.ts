import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  standalone: true, // ✅ Agora é um componente standalone
  imports: [CommonModule], // ✅ Importa CommonModule para poder usar *ngFor
  template: `
    <div class="container mt-3 fixed-top">
      <div *ngFor="let msg of alertService.messages" class="alert alert-{{ msg.type }} alert-dismissible fade show" role="alert">
        {{ msg.text }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}
