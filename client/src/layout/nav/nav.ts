import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  protected accountService = inject(AccountService);
  protected email = signal('');
  protected password = signal('');
  readonly loginForm = viewChild.required<NgForm>('loginForm');
  

  login() {
    this.accountService.login({email: this.email(), password: this.password()}).subscribe(
      {
        next: response => {
          console.log('Logged in successfully', response);
          this.loginForm().resetForm();
        },
        error: err => alert('Login failed: ' + err.message)
      }
    )
  }

  logout() {
    this.accountService.logout();
  }

}
