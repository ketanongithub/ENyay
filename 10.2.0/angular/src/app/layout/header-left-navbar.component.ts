import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
    selector: 'header-left-navbar',
    templateUrl: './header-left-navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class HeaderLeftNavbarComponent {
    readonly layoutStore = inject(LayoutStoreService);
    readonly sidebarExpanded = this.layoutStore.sidebarExpanded;

    toggleSidebar(): void {
        this.layoutStore.setSidebarExpanded(!this.sidebarExpanded());
    }
}
