import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { InmateManagementRoutingModule } from './inmate-management-routing.module';
import { InmateListComponent } from './inmate-list/inmate-list.component';
import { CreateEditInmateComponent } from './create-edit-inmate/create-edit-inmate.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InmateManagementRoutingModule,
        InmateListComponent,
        CreateEditInmateComponent,
    ],
})
export class InmateManagementModule {}
