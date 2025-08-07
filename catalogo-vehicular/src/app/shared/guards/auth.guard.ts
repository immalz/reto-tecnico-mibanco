import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.services';

const routerInjection = () => inject(Router);
const authService = () => inject(AuthService);

export const privateGuard: CanActivateFn = async () => {

  const router = routerInjection();

  const {data} = await authService().session();

  if(!data.session) {
    router.navigate(['/acceso']);
  }

  return !!data.session;
}

export const publicGuard: CanActivateFn = async () => {
  const router = routerInjection();

  const {data} = await authService().session();

  if(data.session) {
    router.navigate(['/dashboard/vehiculos']);
  }

  return !data.session;
}