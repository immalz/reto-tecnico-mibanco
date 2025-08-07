import { Routes } from '@angular/router';

export const VehicleRoutes: Routes = [
    {path: '', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent), children: [
        {path: 'vehiculos', loadComponent: () => import('./pages/vehicles/vehicles.component').then(m => m.VehiclesComponent)},
        {path: 'marcas', loadComponent: () => import('./pages/brand/brand.component').then(m => m.BrandComponent)},
    ]},
    // {path: 'dashboard', redirectTo: 'dashboard/vehiculos'}
];
