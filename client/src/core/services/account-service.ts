import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { AppUser, LoginCredentials, RegisterCredentials } from '../models/user-models';
import { catchError, tap } from 'rxjs';
import { ToastService } from './toast-service';

export const BASE_API_URL = new InjectionToken<string>(
  'BASE_API_URL',
  {
    providedIn: 'root',
    factory: () => 'https://localhost:5001/api'
  });

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  #http = inject(HttpClient);
  #baeApiUrl = inject(BASE_API_URL);
  #toastService = inject(ToastService);



  readonly #user = signal<AppUser | null>(null);
  readonly user = this.#user.asReadonly();
  readonly #storeUserKey = 'user';

  login(credentials: LoginCredentials) {
    return this.#http.post<AppUser>(`${this.#baeApiUrl}/account/login`, credentials).pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(err => {
        this.#toastService.error('Login failed: ' + err.error);
        throw err;
      }
    ));
  }

  logout() {
    this.#user.set(null);
    localStorage.removeItem(this.#storeUserKey);
  }

  register(credentials: RegisterCredentials) {
    return this.#http.post<AppUser>(`${this.#baeApiUrl}/account/register`, credentials)
    .pipe(
      tap(user => this.setCurrentUser(user)),
      catchError(err => {
        this.#toastService.error('Registration failed: ' + err.error);
        throw err;
      }
    ));
  }

  restoreUser() {
    const userString = localStorage.getItem(this.#storeUserKey);
    if (!userString) return;
    try {
      const user: AppUser = JSON.parse(userString);
      if (!user.token) return;
      this.#user.set(user);
    } catch (error) {
      console.warn('Error restoring user from local storage', error);
    }

  }

  setCurrentUser(user: AppUser) {
    if(!user) return;
    this.#user.set(user);
    localStorage.setItem(this.#storeUserKey, JSON.stringify(user));
  }

}
