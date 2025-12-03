import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(errorResponse => {
      if (errorResponse) {
        switch (errorResponse.status) {
          case 400:
            if (errorResponse?.error?.errors) {
              const modelStateErrors = [];
              for (const key in errorResponse.error.errors) {
                modelStateErrors.push(errorResponse.error.errors[key]);
              }
              console.log(errorResponse.error.errors);
              console.log(modelStateErrors.flat());
              throw modelStateErrors.flat();
            } else {
              toastService.error(errorResponse.error, errorResponse.status.toString());
            }
            break;
          case 401:
            toastService.error('Unauthorized');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = {
              state: { error: errorResponse.error }
            };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastService.error('Something went wrong');
            break;
        }
      }
      return throwError(() => errorResponse);
    })
  );
};
