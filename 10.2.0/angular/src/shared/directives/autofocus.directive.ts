import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Focuses the host element after the view initializes. Useful for forms where
 * the user should immediately start typing (login, search, modal inputs).
 *
 * Usage: <input appAutofocus />
 *        <input [appAutofocus]="loginMode === 'inmate'" />
 */
@Directive({
    selector: '[appAutofocus]',
    standalone: true,
})
export class AutofocusDirective implements AfterViewInit {
    @Input('appAutofocus') enabled: boolean | '' = true;

    constructor(private host: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        if (this.enabled === false) {
            return;
        }
        // Defer to next tick so the element is fully laid out before focus.
        setTimeout(() => {
            const el = this.host?.nativeElement;
            if (el && typeof (el as HTMLInputElement).focus === 'function') {
                (el as HTMLInputElement).focus();
            }
        });
    }
}
