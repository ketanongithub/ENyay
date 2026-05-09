import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Catches HTTP errors that bypass the ABP framework's own interceptor (e.g.
 * external services, asset URLs, or future non-ABP backends) and surfaces
 * them as ABP toasts so the UX stays consistent.
 *
 * The ABP-managed `/api/services/*` endpoints already use `AbpHttpInterceptor`
 * which handles its own error display, so we deliberately skip those URLs
 * to avoid double-toasting.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (this.shouldHandle(request)) {
                    this.notify(error);
                }
                return throwError(() => error);
            })
        );
    }

    private shouldHandle(request: HttpRequest<unknown>): boolean {
        // Let AbpHttpInterceptor handle ABP service calls (it already shows
        // its own toasts and handles 401 redirects).
        return !request.url.includes('/api/services/');
    }

    private notify(error: HttpErrorResponse): void {
        // Bail out silently when ABP isn't loaded yet (very early bootstrap
        // errors) so we don't blow up the error chain.
        if (typeof abp === 'undefined' || !abp.notify) {
            return;
        }

        if (error.status === 0) {
            abp.notify.error('Network error — please check your connection.');
            return;
        }

        const message =
            (error.error && typeof error.error === 'object' && (error.error.message || error.error.error)) ||
            error.message ||
            `Request failed with status ${error.status}.`;
        abp.notify.error(String(message));
    }
}
