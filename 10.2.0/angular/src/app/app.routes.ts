import { Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'users',
                loadChildren: () => import('./users/users.routes').then((m) => m.USERS_ROUTES),
                data: { permission: 'Pages.Users' },
                canActivate: [AppRouteGuard],
            },
            {
                path: 'roles',
                loadChildren: () => import('./roles/roles.routes').then((m) => m.ROLES_ROUTES),
                data: { permission: 'Pages.Roles' },
                canActivate: [AppRouteGuard],
            },
            {
                path: 'tenants',
                loadChildren: () => import('./tenants/tenants.routes').then((m) => m.TENANTS_ROUTES),
                data: { permission: 'Pages.Tenants' },
                canActivate: [AppRouteGuard],
            },
            {
                path: 'update-password',
                loadChildren: () => import('./users/users.routes').then((m) => m.USERS_ROUTES),
                canActivate: [AppRouteGuard],
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
                canActivate: [AppRouteGuard],
            },
        ],
    },
];
