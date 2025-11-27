import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  protected accountService = inject(AccountService);
  readonly #toastService = inject(ToastService);
  readonly #router = inject(Router);
  protected email = signal('');
  protected password = signal('');
  readonly loginForm = viewChild.required<NgForm>('loginForm');
  

  login() {
    this.accountService.login({email: this.email(), password: this.password()}).subscribe(
      {
        next: _ => {
          this.#router.navigateByUrl('/members');
          this.loginForm().resetForm();
          this.#toastService.success('Login successful');
        },
        // error: err => alert('Login failed: ' + err.message)
      }
    )
  }

  logout() {
    this.accountService.logout();
    this.#router.navigateByUrl('/');
  }

}
