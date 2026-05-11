import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, PrimeTemplate } from 'primeng/api';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase } from 'shared/paged-listing-component-base';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { AutofocusDirective } from '@shared/directives/autofocus.directive';
import { InmateRecord, MockInmateService } from '@shared/services/mock-inmate.service';

@Component({
    templateUrl: './inmate-list.component.html',
    styleUrls: ['./inmate-list.component.css'],
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [
        DecimalPipe,
        FormsModule,
        RouterLink,
        TableModule,
        PrimeTemplate,
        PageHeaderComponent,
        StatusBadgeComponent,
        BreadcrumbsComponent,
        AutofocusDirective,
    ],
})
export class InmateListComponent extends PagedListingComponentBase<InmateRecord> {
    @ViewChild('dataTable', { static: true }) dataTable: Table;

    keyword = '';

    constructor(
        injector: Injector,
        cd: ChangeDetectorRef,
        private inmateStore: MockInmateService
    ) {
        super(injector, cd);
    }

    ngOnInit(): void {
        // Auto-load on first navigation so the user does not need to click search.
        this.list();
    }

    list(_event?: LazyLoadEvent): void {
        const records = this.inmateStore.list(this.keyword);
        this.primengTableHelper.records = records;
        this.primengTableHelper.totalRecordsCount = records.length;
        this.cd.detectChanges();
    }

    delete(inmate: InmateRecord): void {
        abp.message.confirm(`Delete inmate ${inmate.fullName}?`, undefined, (result: boolean) => {
            if (result) {
                this.inmateStore.delete(inmate.id);
                abp.notify.success('Inmate deleted (mock).');
                this.refresh();
            }
        });
    }

    initials(name: string): string {
        return (name || '')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() || '')
            .join('');
    }

    avatarColor(id: number): string {
        const palette = ['#1a73e8', '#0f9d58', '#db4437', '#f4b400', '#5f6368', '#9334e6', '#ff6d01'];
        return palette[id % palette.length];
    }

    primaryContact(record: InmateRecord): string {
        const phone = record.audioContact?.contactNumber1;
        return phone ? '+91 ' + phone : '—';
    }
}
