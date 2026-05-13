import { Routes } from '@angular/router';
import { AddUpdateInmateComponent } from './add-update-inmate/add-update-inmate';
import { InmateListComponent } from './inmate-list/inmate-list';

export const inmateManagementRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add-update', component: AddUpdateInmateComponent },
  { path: 'list', component: InmateListComponent },
];
