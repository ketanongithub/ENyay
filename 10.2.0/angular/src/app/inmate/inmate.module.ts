import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { InmateRoutingModule } from './inmate-routing.module';
import { InmatePortalComponent } from './inmate-portal.component';
import { InmateHomeComponent } from './inmate-home/inmate-home.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InmateRoutingModule,
        InmatePortalComponent,
        InmateHomeComponent,
        MyRequestsComponent,
    ],
})
export class InmateModule {}
