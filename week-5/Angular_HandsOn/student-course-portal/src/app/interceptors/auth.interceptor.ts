import { HttpInterceptorFn } from '@angular/common/http';

/**
 * AuthInterceptor (Hands-On 8)
 * Appends Authorization header to every outgoing HTTP request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'mock-token-12345';
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  console.log(`[AuthInterceptor] Attaching token to: ${req.url}`);
  return next(authReq);
};
