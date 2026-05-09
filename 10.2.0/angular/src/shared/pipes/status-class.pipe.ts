import { Pipe, PipeTransform } from '@angular/core';

/**
 * Maps a status string ("Approved", "Pending", "Rejected", ...) to a Bootstrap
 * badge class. Single source of truth for status colors across the app.
 *
 * Usage: <span [class]="status | statusClass">{{ status }}</span>
 */
@Pipe({
    name: 'statusClass',
    standalone: true,
    pure: true,
})
export class StatusClassPipe implements PipeTransform {
    transform(status: string | null | undefined): string {
        const normalized = (status || '').toLowerCase();
        switch (normalized) {
            case 'approved':
            case 'active':
                return 'badge bg-success';
            case 'pending':
            case 'waiting':
                return 'badge bg-warning text-dark';
            case 'rejected':
            case 'inactive':
            case 'disabled':
            case 'deactivated':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    }
}
