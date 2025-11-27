import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  #sanitizer = inject(DomSanitizer);

  #createToastContainer(): HTMLElement {
    let container = document.getElementById('toast-container');
    if(container) return container;
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast toast-bottom toast-end';
    document.body.appendChild(container);
    return container!;
  }

  #createToastElement(message: string, alertClass: string, duration = 5000) {
    const container = this.#createToastContainer();
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    const innerHtml = `
    <span>${message}</span>
    <button class="btn btn-sm btn-ghost ml-4">x<button>
    `;
    toast.innerHTML = innerHtml;
    toast.querySelector('button')!.addEventListener('click', () => {
      container.removeChild(toast);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if(!container.contains(toast)) return;
      container.removeChild(toast);
    }, duration);
  }

  success(message: string, duration?: number) {
    this.#createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.#createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.#createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.#createToastElement(message, 'alert-info', duration);
  }
  
}
