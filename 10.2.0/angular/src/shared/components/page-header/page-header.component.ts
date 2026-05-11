import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <section class="content-header">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-6">
                        <h1 class="m-0">{{ title() }}</h1>
                        @if (subtitle()) {
                            <small class="text-muted">{{ subtitle() }}</small>
                        }
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
    readonly title = input('');
    readonly subtitle = input<string | null>(null);
}
