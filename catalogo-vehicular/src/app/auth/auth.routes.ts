import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
    {path: 'iniciar-sesion', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},
    {path: 'registro', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)},
    {path: '**', redirectTo: 'iniciar-sesion'}
];
