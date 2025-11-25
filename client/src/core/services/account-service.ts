import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { AppUser, RegisterCredentials } from '../models/user-models';
import { tap } from 'rxjs';

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



  readonly #user = signal<AppUser | null>(null);
  readonly user = this.#user.asReadonly();
  readonly #storeUserKey = 'user';

  login(credentials: { email: string, password: string }) {
    return this.#http.post<AppUser>(`${this.#baeApiUrl}/account/login`, credentials).pipe(
      tap(user => this.setCurrentUser(user))
    );
  }

  logout() {
    this.#user.set(null);
    localStorage.removeItem(this.#storeUserKey);
  }

  register(credentials: RegisterCredentials) {
    return this.#http.post<AppUser>(`${this.#baeApiUrl}/account/register`, credentials)
    .pipe(tap(user => this.setCurrentUser(user)))
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
