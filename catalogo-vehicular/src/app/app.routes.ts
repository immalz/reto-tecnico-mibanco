import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    // {path: '', loadComponent: () => import('./vehicles/layout/layout.component').then(m => m.LayoutComponent)},
    {path: 'acceso', canActivate: [publicGuard], loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutes)},
    {path: 'dashboard', canActivate: [privateGuard], loadChildren: () => import('./vehicles/vehicles.routes').then(m => m.VehicleRoutes)},
    {path: '', redirectTo: 'dashboard/vehiculos', pathMatch: 'full'},
];
