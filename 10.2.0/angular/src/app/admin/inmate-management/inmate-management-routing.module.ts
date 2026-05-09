import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmateListComponent } from './inmate-list/inmate-list.component';
import { CreateEditInmateComponent } from './create-edit-inmate/create-edit-inmate.component';
import { FamilyContactsComponent } from './family-contacts/family-contacts.component';

const routes: Routes = [
    { path: '', component: InmateListComponent, pathMatch: 'full' },
    { path: 'new', component: CreateEditInmateComponent },
    { path: 'edit/:id', component: CreateEditInmateComponent },
    { path: 'family-contacts', component: FamilyContactsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InmateManagementRoutingModule {}
