import { Routes } from '@angular/router';
import { InmateListComponent } from './inmate-list/inmate-list.component';
import { CreateEditInmateComponent } from './create-edit-inmate/create-edit-inmate.component';
import { FamilyContactsComponent } from './family-contacts/family-contacts.component';

export const INMATE_MANAGEMENT_ROUTES: Routes = [
    { path: '', component: InmateListComponent, pathMatch: 'full' },
    { path: 'new', component: CreateEditInmateComponent },
    { path: 'edit/:id', component: CreateEditInmateComponent },
    { path: 'family-contacts', component: FamilyContactsComponent },
];
