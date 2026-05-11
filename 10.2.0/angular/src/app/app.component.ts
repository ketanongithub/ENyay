import { Component, Injector, OnInit, Renderer2, inject } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer.component';

@Component({
    templateUrl: './app.component.html',
    standalone: true,
    imports: [HeaderComponent, SidebarComponent, RouterOutlet, FooterComponent],
})
export class AppComponent extends AppComponentBase implements OnInit {
    private readonly renderer = inject(Renderer2);
    private readonly layoutStore = inject(LayoutStoreService);
    readonly sidebarExpanded = this.layoutStore.sidebarExpanded;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.renderer.addClass(document.body, 'sidebar-mini');

        SignalRAspNetCoreHelper.initSignalR();

        abp.event.on('abp.notifications.received', (userNotification) => {
            abp.notifications.showUiNotifyForUserNotification(userNotification);

            Push.create('AbpZeroTemplate', {
                body: userNotification.notification.data.message,
                icon: abp.appPath + 'assets/app-logo-small.png',
                timeout: 6000,
                onClick: function () {
                    window.focus();
                    this.close();
                },
            });
        });
    }

    toggleSidebar(): void {
        this.layoutStore.setSidebarExpanded(!this.sidebarExpanded());
    }
}
