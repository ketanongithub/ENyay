import { Component, ChangeDetectionStrategy, Renderer2, inject, effect } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { SidebarLogoComponent } from './sidebar-logo.component';
import { SidebarUserPanelComponent } from './sidebar-user-panel.component';
import { SidebarMenuComponent } from './sidebar-menu.component';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [SidebarLogoComponent, SidebarUserPanelComponent, SidebarMenuComponent],
})
export class SidebarComponent {
    private readonly renderer = inject(Renderer2);
    private readonly layoutStore = inject(LayoutStoreService);

    constructor() {
        effect(() => {
            const expanded = this.layoutStore.sidebarExpanded();
            if (expanded) {
                this.renderer.removeClass(document.body, 'sidebar-collapse');
                this.renderer.addClass(document.body, 'sidebar-open');
            } else {
                this.renderer.removeClass(document.body, 'sidebar-open');
                this.renderer.addClass(document.body, 'sidebar-collapse');
            }
        });
    }
}
