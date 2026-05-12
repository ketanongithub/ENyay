import { Component, Injector } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';

interface RecentRequest {
    id: string;
    inmateName: string;
    type: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
}

@Component({
    templateUrl: './admin-dashboard.component.html',
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [DecimalPipe, TableModule, PrimeTemplate, PageHeaderComponent, StatusBadgeComponent, BreadcrumbsComponent],
})
export class AdminDashboardComponent extends AppComponentBase {
    totalInmates = 156;
    pendingApprovals = 23;
    activeCalls = 8;
    walletBalance = 45200;

    recentRequests: RecentRequest[] = [
        { id: 'REQ-1042', inmateName: 'Rahul Sharma', type: 'Audio Call', date: '2025-04-29', status: 'Approved' },
        { id: 'REQ-1043', inmateName: 'Amit Kumar', type: 'Video Call', date: '2025-04-30', status: 'Pending' },
        { id: 'REQ-1044', inmateName: 'Suresh Patel', type: 'Wallet Recharge', date: '2025-05-01', status: 'Rejected' },
    ];

    constructor(injector: Injector) {
        super(injector);
    }
}
