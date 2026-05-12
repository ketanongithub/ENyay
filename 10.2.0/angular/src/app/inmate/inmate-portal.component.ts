import { Component, Injector } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { MockInmateSessionService } from '@shared/services/mock-inmate-session.service';

@Component({
    templateUrl: './inmate-portal.component.html',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class InmatePortalComponent extends AppComponentBase {
    constructor(
        injector: Injector,
        private router: Router,
        private inmateSession: MockInmateSessionService
    ) {
        super(injector);
    }

    logout(): void {
        this.inmateSession.clear();
        this.router.navigate(['/account/login']);
    }
}
