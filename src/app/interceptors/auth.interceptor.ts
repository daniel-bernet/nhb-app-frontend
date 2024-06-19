import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticationUrl = `${authService.getApiDomain()}/account/authenticate`;

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === 401 && req.url !== authenticationUrl) {
        return authService.authenticateJWT().pipe(
          switchMap((response) => {
            if (response.isAuthenticated) {
              const modifiedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authService.getJWT()}`,
                },
              });
              return next(modifiedReq);
            } else {
              authService.voidJWT();
              if (!router.url.includes('/login')) {
                router.navigateByUrl('/login');
              }
              return throwError(
                () => new Error('Session expired, please login again')
              );
            }
          }),
          catchError((authError) => {
            authService.voidJWT();
            router.navigateByUrl('/login');
            return throwError(
              () => new Error('Session expired, please login again')
            );
          })
        );
      }
      return throwError(() => error);
    })
  );
};
