import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AddUpdateInmateComponent } from './add-update-inmate/add-update-inmate';
import { InmateListComponent } from './inmate-list/inmate-list';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'add-update', component: AddUpdateInmateComponent },
  { path: 'list', component: InmateListComponent },
];

@NgModule({
  declarations: [AddUpdateInmateComponent, InmateListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class InmateManagementModule {}
