import { Component, input, output, ChangeDetectionStrategy, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'abp-modal-header',
    templateUrl: './abp-modal-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AbpModalHeaderComponent extends AppComponentBase {
    readonly title = input<string>();

    readonly onCloseClick = output();

    constructor(injector: Injector) {
        super(injector);
    }
}
