import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: AdminDashboardComponent,
    },
    {
        path: 'inmate-management',
        loadChildren: () =>
            import('./inmate-management/inmate-management.routes').then((m) => m.INMATE_MANAGEMENT_ROUTES),
    },
];
