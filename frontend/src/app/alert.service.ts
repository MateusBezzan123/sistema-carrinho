import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  messages: { type: string, text: string }[] = [];

  addAlert(type: string, text: string): void {
    this.messages.push({ type, text });

    setTimeout(() => {
      this.messages.shift();
    }, 5000);
  }
}
