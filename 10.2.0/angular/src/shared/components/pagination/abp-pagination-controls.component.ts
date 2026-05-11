import { Component, input, output, booleanAttribute } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'abp-pagination-controls',
    templateUrl: './abp-pagination-controls.component.html',
    standalone: true,
    imports: [NgxPaginationModule],
})
export class AbpPaginationControlsComponent {
    readonly id = input<string>();
    readonly maxSize = input(7);
    readonly previousLabel = input('Previous');
    readonly nextLabel = input('Next');
    readonly screenReaderPaginationLabel = input('Pagination');
    readonly screenReaderPageLabel = input('page');
    readonly screenReaderCurrentLabel = input("You're on page");
    readonly directionLinks = input(true, { transform: booleanAttribute });
    readonly autoHide = input(false, { transform: booleanAttribute });
    readonly pageChange = output<number>();
}
