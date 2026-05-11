import { Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
    { path: '', redirectTo: '/app/admin/dashboard', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: () => import('account/account.routes').then((m) => m.ACCOUNT_ROUTES),
        data: { preload: true },
    },
    {
        path: 'inmate',
        loadChildren: () => import('app/inmate/inmate.routes').then((m) => m.INMATE_ROUTES),
    },
    {
        path: 'app',
        loadChildren: () => import('app/app.routes').then((m) => m.APP_ROUTES),
        data: { preload: true },
    },
];
