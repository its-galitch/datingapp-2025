import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../error-type';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
  protected readonly error = signal<ApiError|null>(null);
  protected readonly showDetails = signal(false);
  #router = inject(Router);

  protected readonly showDetailsToggle = () => this.showDetails.set(!this.showDetails());

  constructor() {
    const navigation = this.#router.getCurrentNavigation();
    const error = navigation?.extras.state?.['error'] as ApiError;
    this.error.set(error);
    
  }
}
