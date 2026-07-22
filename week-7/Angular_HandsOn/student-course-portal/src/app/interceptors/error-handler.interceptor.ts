import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * ErrorHandlerInterceptor (Hands-On 8)
 * Handles HTTP 401 (redirect to home) and 500 (log error) globally.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('[ErrorInterceptor] 401 Unauthorized - redirecting to home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('[ErrorInterceptor] 500 Internal Server Error:', error.message);
      } else if (error.status === 0) {
        console.warn('[ErrorInterceptor] Network error - API server may not be running.');
      }
      return throwError(() => error);
    })
  );
};
