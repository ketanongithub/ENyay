import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

@NgModule({
    imports: [CommonModule, SharedModule, AdminRoutingModule, AdminDashboardComponent],
})
export class AdminModule {}
