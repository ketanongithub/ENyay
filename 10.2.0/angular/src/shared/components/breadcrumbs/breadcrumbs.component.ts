import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
    label: string;
    link?: any[] | string;
    icon?: string;
}

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <nav class="app-breadcrumbs" aria-label="Breadcrumb">
            <ol>
                @for (item of trail(); track item.label; let last = $last) {
                    <li [class.active]="last">
                        @if (item.link && !last) {
                            <a [routerLink]="item.link">
                                @if (item.icon) {
                                    <i [class]="item.icon"></i>
                                }
                                {{ item.label }}
                            </a>
                        } @else {
                            <span>
                                @if (item.icon) {
                                    <i [class]="item.icon"></i>
                                }
                                {{ item.label }}
                            </span>
                        }
                    </li>
                }
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
    readonly trail = input<BreadcrumbItem[]>([]);
}
