import { Routes } from '@angular/router';

export const CoreRoutes: Routes = [
    {path: '', loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent), children: [
        {path: 'cotizador', loadComponent: () => import('./pages/quotes/quotes.component').then(m => m.QuotesComponent)},
        {path: 'historial', loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent)},
        {path: '**', pathMatch: 'full', redirectTo: 'cotizador'}
    ]},
    // {path: 'dashboard', redirectTo: 'dashboard/vehiculos'}
];
