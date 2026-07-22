import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard (Hands-On 7)
 *
 * Functional route guard that checks if the user is logged in.
 * Redirects to '/' if not authenticated.
 * Protects: /profile, /enroll, /reactive-enroll
 */
export const authGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  console.warn('[AuthGuard] Access denied - redirecting to home');
  return router.createUrlTree(['/']);
};
