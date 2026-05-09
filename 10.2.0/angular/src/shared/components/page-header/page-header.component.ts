import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Standard AdminLTE-style page header used at the top of admin/inmate pages.
 *
 * Replaces the repeated `<section class="content-header">` markup. The right
 * column is projected via `<ng-content>` so callers can drop in action
 * buttons.
 *
 * Usage:
 * <app-page-header title="Inmate Management">
 *   <a class="btn bg-blue" [routerLink]="['./new']">Add New Inmate</a>
 * </app-page-header>
 */
@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="content-header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-6">
                        <h1 class="m-0">{{ title }}</h1>
                        <small *ngIf="subtitle" class="text-muted">{{ subtitle }}</small>
                    </div>
                    <div class="col-6 text-right">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </section>
    `,
})
export class PageHeaderComponent {
    @Input() title = '';
    @Input() subtitle: string | null = null;
}
