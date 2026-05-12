import { Component, Injector } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';

interface InmateRequest {
    id: string;
    type: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'Disabled';
}

@Component({
    templateUrl: './my-requests.component.html',
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [TableModule, PrimeTemplate, StatusBadgeComponent],
})
export class MyRequestsComponent extends AppComponentBase {
    requests: InmateRequest[] = [
        { id: 'REQ-3001', type: 'Audio Call', date: '2025-04-26', status: 'Approved' },
        { id: 'REQ-3002', type: 'Video Call', date: '2025-04-28', status: 'Pending' },
        { id: 'REQ-3003', type: 'Wallet Recharge', date: '2025-04-29', status: 'Approved' },
        { id: 'REQ-3004', type: 'Audio Call', date: '2025-05-01', status: 'Rejected' },
    ];

    constructor(injector: Injector) {
        super(injector);
    }
}
