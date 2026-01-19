import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthStore } from '@store/auth.store';
import { map } from 'rxjs';

/**
 * Auth guard to protect routes requiring authentication
 * @returns true if authenticated, otherwise redirects to login
 */
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  return toObservable(authStore.isAuthenticated).pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        void router.navigate(['/login']);
        return false;
      }

      return true;
    })
  );
};

/**
 * Example: Role-based guard
 * You can create additional guards for specific roles
 *
 * export const adminGuard: CanActivateFn = () => {
 *   const router = inject(Router);
 *   const authStore = inject(AuthStore);
 *
 *   return toObservable(authStore.user).pipe(
 *     map((user) => {
 *       if (!user || user.role !== 'admin') {
 *         void router.navigate(['/access-denied']);
 *         return false;
 *       }
 *       return true;
 *     })
 *   );
 * };
 */
