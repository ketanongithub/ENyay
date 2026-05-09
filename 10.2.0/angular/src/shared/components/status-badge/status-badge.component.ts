import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusClassPipe } from '@shared/pipes/status-class.pipe';

/**
 * Reusable colored status badge. Wraps the {@link StatusClassPipe} so callers
 * just pass a status string and get consistent styling.
 *
 * Usage: <app-status-badge [status]="row.status" />
 */
@Component({
    selector: 'app-status-badge',
    standalone: true,
    imports: [CommonModule, StatusClassPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<span [class]="status | statusClass">{{ status }}</span>`,
})
export class StatusBadgeComponent {
    @Input() status: string | null | undefined = '';
}
