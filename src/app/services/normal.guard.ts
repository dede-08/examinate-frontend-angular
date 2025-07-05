import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const user = loginService.getUser();

  if (loginService.isLoggedIn() && user?.authorities[0]?.authority === 'NORMAL') {
    return true;
  }

  // redirige si no es normal
  router.navigate(['/login']);
  return false;
};
