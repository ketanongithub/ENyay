import { Component, input, output, ChangeDetectionStrategy, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'abp-modal-footer',
    templateUrl: './abp-modal-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class AbpModalFooterComponent extends AppComponentBase {
    readonly cancelLabel = input(this.l('Cancel'));
    readonly cancelDisabled = input<boolean>();
    readonly saveLabel = input(this.l('Save'));
    readonly saveDisabled = input<boolean>();

    readonly onCancelClick = output();

    constructor(injector: Injector) {
        super(injector);
    }
}
