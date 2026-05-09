import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
    label: string;
    /** Router commands array. Optional — last item is rendered as plain text. */
    link?: any[] | string;
    icon?: string;
}

/**
 * Lightweight breadcrumb trail used at the top of admin pages.
 *
 * Usage:
 *   <app-breadcrumbs [trail]="[
 *     { label: 'Admin', link: ['/app/admin/dashboard'], icon: 'fas fa-home' },
 *     { label: 'Inmate Management', link: ['/app/admin/inmate-management'] },
 *     { label: 'Add Inmate' }
 *   ]"></app-breadcrumbs>
 */
@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [CommonModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <nav class="app-breadcrumbs" aria-label="Breadcrumb">
            <ol>
                <li *ngFor="let item of trail; let last = last" [class.active]="last">
                    <ng-container *ngIf="item.link && !last; else plain">
                        <a [routerLink]="item.link">
                            <i *ngIf="item.icon" [class]="item.icon"></i>
                            {{ item.label }}
                        </a>
                    </ng-container>
                    <ng-template #plain>
                        <span>
                            <i *ngIf="item.icon" [class]="item.icon"></i>
                            {{ item.label }}
                        </span>
                    </ng-template>
                </li>
            </ol>
        </nav>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            .app-breadcrumbs ol {
                list-style: none;
                margin: 0;
                padding: 0.5rem 1.25rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.35rem 0.75rem;
                background: #f4f7fb;
                border-radius: 8px;
                font-size: 0.85rem;
            }
            .app-breadcrumbs li {
                display: flex;
                align-items: center;
                color: #6c7480;
            }
            .app-breadcrumbs li + li::before {
                content: '\\f105';
                font-family: 'Font Awesome 5 Free', 'Font Awesome 5 Pro', FontAwesome, sans-serif;
                font-weight: 900;
                margin-right: 0.75rem;
                color: #b6bccd;
            }
            .app-breadcrumbs a {
                color: #1a73e8;
                text-decoration: none;
                font-weight: 500;
            }
            .app-breadcrumbs a:hover {
                text-decoration: underline;
            }
            .app-breadcrumbs li.active span {
                color: #1a3c7a;
                font-weight: 600;
            }
            .app-breadcrumbs i {
                margin-right: 0.35rem;
            }
        `,
    ],
})
export class BreadcrumbsComponent {
    @Input() trail: BreadcrumbItem[] = [];
}
