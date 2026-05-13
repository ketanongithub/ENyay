import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!environment.production) {
      const startTime = Date.now();

      return next.handle(request).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              const elapsed = Date.now() - startTime;
              console.log(
                `[HTTP] ${request.method} ${request.urlWithParams} - ${event.status} (${elapsed}ms)`
              );
            }
          },
          error: (error) => {
            const elapsed = Date.now() - startTime;
            console.error(
              `[HTTP ERROR] ${request.method} ${request.urlWithParams} - ${error.status} (${elapsed}ms)`
            );
          },
        }),
        finalize(() => {
          // Additional cleanup can be done here
        })
      );
    }

    return next.handle(request);
  }
}
