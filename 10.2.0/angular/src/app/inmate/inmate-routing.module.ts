import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmatePortalComponent } from './inmate-portal.component';
import { InmateHomeComponent } from './inmate-home/inmate-home.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InmateRoutingModule {}
