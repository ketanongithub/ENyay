import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Router, RouterEvent, NavigationEnd, PRIMARY_OUTLET, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '@shared/layout/menu-item';
import { NgTemplateOutlet } from '@angular/common';
import { CollapseDirective } from 'ngx-bootstrap/collapse';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    standalone: true,
    imports: [NgTemplateOutlet, RouterLink, CollapseDirective],
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/admin/dashboard';

    constructor(
        injector: Injector,
        private router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);

        this.router.events.subscribe((event: NavigationEnd) => {
            const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
            const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root.children[PRIMARY_OUTLET];
            if (primaryUrlSegmentGroup) {
                this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
            }
        });
    }

    getMenuItems(): MenuItem[] {
        return [
            new MenuItem(this.l('Dashboard'), '/app/admin/dashboard', 'fas fa-tachometer-alt'),
            new MenuItem(this.l('Inmate Management'), '', 'fas fa-user-friends', null, [
                new MenuItem(this.l('Add / Update Inmate'), '/app/admin/inmate-management/new', 'fas fa-plus'),
                new MenuItem(this.l('Inmate List'), '/app/admin/inmate-management', 'fas fa-plus'),
                // new MenuItem(
                //     this.l('Family Contacts'),
                //     '/app/admin/inmate-management/family-contacts',
                //     'fas fa-plus'
                // ),
            ]),
            new MenuItem(this.l('Roles'), '/app/roles', 'fas fa-theater-masks', 'Pages.Roles'),
            new MenuItem(this.l('Tenants'), '/app/tenants', 'fas fa-building', 'Pages.Tenants'),
            new MenuItem(this.l('Users'), '/app/users', 'fas fa-users', 'Pages.Users'),
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(url: string, items: MenuItem[], foundedItems: MenuItem[] = []): MenuItem[] {
        // Find the leaf menu item with the longest route that matches the URL,
        // either exactly or as a prefix (so /app/admin/inmate-management/new
        // activates the Add / Update Inmate child instead of the Inmate List).
        let bestMatch: MenuItem | null = null;
        let bestLength = 0;
        const visit = (list: MenuItem[]) => {
            list.forEach((item: MenuItem) => {
                if (item.route && (url === item.route || url.startsWith(item.route + '/'))) {
                    if (item.route.length > bestLength) {
                        bestMatch = item;
                        bestLength = item.route.length;
                    }
                }
                if (item.children) {
                    visit(item.children);
                }
            });
        };
        visit(items);
        if (bestMatch) {
            foundedItems.push(bestMatch);
        }
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
