import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastService = inject(ToastService);
  const router = inject(Router);

  if(!accountService.user()) {
    toastService.error('You must be logged in to access this page.');
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
