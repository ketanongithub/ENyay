import { Routes } from '@angular/router';
import { InmatePortalComponent } from './inmate-portal.component';
import { InmateHomeComponent } from './inmate-home/inmate-home.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';

export const INMATE_ROUTES: Routes = [
    {
        path: '',
        component: InmatePortalComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: InmateHomeComponent },
            { path: 'my-requests', component: MyRequestsComponent },
        ],
    },
];
