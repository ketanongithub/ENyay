import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatusClassPipe } from '@shared/pipes/status-class.pipe';

@Component({
    selector: 'app-status-badge',
    standalone: true,
    imports: [StatusClassPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <span [class]="status() | statusClass">{{ status() }}</span>
    `,
})
export class StatusBadgeComponent {
    readonly status = input<string | null | undefined>('');
}
