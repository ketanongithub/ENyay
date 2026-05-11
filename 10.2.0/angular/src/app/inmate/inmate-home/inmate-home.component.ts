import { Component, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './inmate-home.component.html',
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [FormsModule],
})
export class InmateHomeComponent extends AppComponentBase {
    prisonId = '';
    contactNumber = '';
    biometricVerified = false;
    faceVerified = false;

    constructor(injector: Injector) {
        super(injector);
    }

    dialAudio(): void {
        if (!this.prisonId || !this.contactNumber) {
            abp.notify.error('Enter prison ID and contact number.');
            return;
        }
        abp.notify.success(`Audio call initiated to ${this.contactNumber} (mock).`);
    }

    scanThumbprint(): void {
        this.biometricVerified = true;
        abp.notify.success('Thumbprint verified (mock).');
    }

    startVideoCall(): void {
        this.faceVerified = true;
        abp.notify.success('Video call started (mock).');
    }
}
