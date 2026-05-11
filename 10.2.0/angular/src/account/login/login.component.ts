import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { FormsModule } from '@angular/forms';
import { AbpValidationSummaryComponent } from '../../shared/components/validation/abp-validation.summary.component';
import { Router, RouterLink } from '@angular/router';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { AutofocusDirective } from '@shared/directives/autofocus.directive';
import { MockInmateSessionService } from '@shared/services/mock-inmate-session.service';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    standalone: true,
    imports: [FormsModule, AbpValidationSummaryComponent, RouterLink, LocalizePipe, AutofocusDirective],
})
export class LoginComponent extends AppComponentBase {
    submitting = false;
    loginMode: 'admin' | 'inmate' = 'admin';
    prisonId = '';

    constructor(
        injector: Injector,
        public authService: AppAuthService,
        private _sessionService: AbpSessionService,
        private router: Router,
        private inmateSession: MockInmateSessionService
    ) {
        super(injector);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return true;
    }

    login(): void {
        this.submitting = true;
        this.authService.authenticate(() => (this.submitting = false));
    }

    inmateLogin(): void {
        const prisonId = (this.prisonId || '').trim();
        if (!prisonId) {
            abp.notify.error('Enter your Prison ID.');
            return;
        }
        this.inmateSession.set(prisonId);
        abp.notify.success('Welcome, ' + prisonId);
        this.router.navigate(['/inmate/home']);
    }
}
