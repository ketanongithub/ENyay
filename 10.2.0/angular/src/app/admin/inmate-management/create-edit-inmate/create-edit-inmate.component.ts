import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { PrimeTemplate } from 'primeng/api';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge.component';
import { BreadcrumbsComponent, BreadcrumbItem } from '@shared/components/breadcrumbs/breadcrumbs.component';
import { StatusClassPipe } from '@shared/pipes/status-class.pipe';
import {
    ApprovalState,
    InmateRecord,
    MockInmateService,
    emptyInmate,
} from '@shared/services/mock-inmate.service';

interface TabDescriptor {
    index: number;
    label: string;
    icon: string;
    /** Form-control names that, when invalid, mark this tab as invalid. */
    controls?: string[];
    /** Nested FormGroup under the root form whose validity reflects this tab. */
    group?: string;
}

/**
 * Cross-field validator for the inmate-details group: login password and
 * confirm password must match when either is non-empty.
 */
function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = (group.get('loginPassword')?.value || '') as string;
    const confirm = (group.get('confirmPassword')?.value || '') as string;
    if (!pw && !confirm) {
        return null;
    }
    return pw === confirm ? null : { passwordsMismatch: true };
}

@Component({
    templateUrl: './create-edit-inmate.component.html',
    styleUrls: ['./create-edit-inmate.component.css'],
    animations: [appModuleAnimation()],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        TableModule,
        TabViewModule,
        PrimeTemplate,
        PageHeaderComponent,
        StatusBadgeComponent,
        BreadcrumbsComponent,
        StatusClassPipe,
    ],
})
export class CreateEditInmateComponent extends AppComponentBase implements OnInit {
    inmateId: number | null = null;
    activeTabIndex = 0;
    rechargeAmount: number | null = null;
    deactivateReason = '';
    deactivateRemarks = '';
    deactivateDocumentName = '';

    /** Mirror of FormGroup `walletBalance` so the wallet-balance card updates immediately. */
    walletBalance = 0;

    form!: FormGroup;

    readonly tabs: TabDescriptor[] = [
        {
            index: 0,
            label: 'Inmate Details',
            icon: 'fas fa-id-badge',
            controls: ['fullName', 'fatherName', 'gender', 'jailNo', 'prisonId', 'loginPassword', 'confirmPassword'],
        },
        { index: 1, label: 'Audio Call', icon: 'fas fa-phone', group: 'audioContact' },
        { index: 2, label: 'Video Call', icon: 'fas fa-video', group: 'videoContact' },
        { index: 3, label: 'Biometric & Face', icon: 'fas fa-fingerprint', group: 'biometric' },
        { index: 4, label: 'Wallet & Recharge', icon: 'fas fa-wallet' },
        { index: 5, label: 'Approval Workflow', icon: 'fas fa-check-double', group: 'approval' },
        { index: 6, label: 'Deactivation', icon: 'fas fa-ban' },
    ];

    readonly relations = MockInmateService.RELATIONS;
    readonly rechargePresets = [500, 1000, 2000, 5000];
    readonly deactivateReasons = [
        'Misuse of calling privileges',
        'Disciplinary action',
        'Court order',
        'Transfer to another facility',
        'Other',
    ];

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private inmateStore: MockInmateService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.buildForm();

        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            const id = parseInt(idParam, 10);
            const existing = this.inmateStore.get(id);
            if (!existing) {
                abp.notify.error(`Inmate ${id} not found.`);
                this.router.navigate(['/app/admin/inmate-management']);
                return;
            }
            // Deep clone so cancelling does not mutate the store.
            this.patchFromRecord(JSON.parse(JSON.stringify(existing)));
            this.inmateId = id;
        }
    }

    private buildForm(): FormGroup {
        const seed = emptyInmate();
        this.walletBalance = seed.walletBalance;
        return this.fb.group(
            {
                fullName: [seed.fullName, [Validators.required, Validators.maxLength(80)]],
                aliasName: [seed.aliasName, Validators.maxLength(80)],
                fatherName: [seed.fatherName, [Validators.required, Validators.maxLength(80)]],
                gender: [seed.gender, Validators.required],
                jailNo: [seed.jailNo, Validators.required],
                prisonId: [seed.prisonId, Validators.required],
                aadharNumber: [seed.aadharNumber],
                passportNumber: [seed.passportNumber],
                drivingLicenseNumber: [seed.drivingLicenseNumber],
                loginPassword: [seed.loginPassword, Validators.minLength(8)],
                confirmPassword: [''],
                audioContact: this.fb.group({
                    fullName: [seed.audioContact.fullName],
                    fatherName: [seed.audioContact.fatherName],
                    relation: [seed.audioContact.relation],
                    contactNumber1: [
                        seed.audioContact.contactNumber1,
                        Validators.pattern(/^\d{10}$/),
                    ],
                    contactNumber2: [seed.audioContact.contactNumber2, Validators.pattern(/^\d{10}$/)],
                    simOwnerName: [seed.audioContact.simOwnerName],
                    simOwnerValidated: [seed.audioContact.simOwnerValidated],
                }),
                videoContact: this.fb.group({
                    fullName: [seed.videoContact.fullName],
                    fatherName: [seed.videoContact.fatherName],
                    relation: [seed.videoContact.relation],
                    appIds: this.fb.array(seed.videoContact.appIds.map((entry) => this.makeAppIdGroup(entry))),
                }),
                biometric: this.fb.group({
                    thumbCaptured: [seed.biometric.thumbCaptured],
                    faceCaptured: [seed.biometric.faceCaptured],
                }),
                approval: this.fb.group({
                    level1Status: [seed.approval.level1Status],
                    level1Remarks: [seed.approval.level1Remarks],
                    level2Status: [seed.approval.level2Status],
                    level2Remarks: [seed.approval.level2Remarks],
                    level3Status: [seed.approval.level3Status],
                    level3Remarks: [seed.approval.level3Remarks],
                }),
            },
            { validators: passwordsMatchValidator }
        );
    }

    private makeAppIdGroup(entry: { appId: string; registeredName: string }): FormGroup {
        return this.fb.group({
            appId: [entry.appId],
            registeredName: [entry.registeredName],
        });
    }

    private patchFromRecord(record: InmateRecord): void {
        this.walletBalance = record.walletBalance;
        // Resize the appIds FormArray to the record's length before patching.
        const appIds = this.appIdsArray;
        while (appIds.length < record.videoContact.appIds.length) {
            appIds.push(this.makeAppIdGroup({ appId: '', registeredName: '' }));
        }
        while (appIds.length > record.videoContact.appIds.length) {
            appIds.removeAt(appIds.length - 1);
        }
        this.form.patchValue(
            {
                fullName: record.fullName,
                aliasName: record.aliasName,
                fatherName: record.fatherName,
                gender: record.gender,
                jailNo: record.jailNo,
                prisonId: record.prisonId,
                aadharNumber: record.aadharNumber,
                passportNumber: record.passportNumber,
                drivingLicenseNumber: record.drivingLicenseNumber,
                loginPassword: record.loginPassword,
                confirmPassword: record.loginPassword,
                audioContact: record.audioContact,
                videoContact: {
                    fullName: record.videoContact.fullName,
                    fatherName: record.videoContact.fatherName,
                    relation: record.videoContact.relation,
                    appIds: record.videoContact.appIds,
                },
                biometric: record.biometric,
                approval: record.approval,
            },
            { emitEvent: false }
        );
    }

    /** ------------------------ Form helpers ------------------------ */

    get appIdsArray(): FormArray<FormGroup> {
        return this.form.get('videoContact.appIds') as FormArray<FormGroup>;
    }

    get approvalGroup(): FormGroup {
        return this.form.get('approval') as FormGroup;
    }

    get audioContactGroup(): FormGroup {
        return this.form.get('audioContact') as FormGroup;
    }

    get biometricGroup(): FormGroup {
        return this.form.get('biometric') as FormGroup;
    }

    /** ------------------------ View getters ------------------------ */

    get pageTitle(): string {
        const name = this.form?.get('fullName')?.value || this.form?.get('prisonId')?.value;
        return this.inmateId ? `Edit Inmate · ${name || ''}` : 'Add / Update Inmate';
    }

    get isLastTab(): boolean {
        return this.activeTabIndex === this.tabs.length - 1;
    }

    get isFirstTab(): boolean {
        return this.activeTabIndex === 0;
    }

    get currentTabLabel(): string {
        return this.tabs[this.activeTabIndex]?.label || '';
    }

    get breadcrumbs(): BreadcrumbItem[] {
        const base: BreadcrumbItem[] = [
            { label: 'Admin', link: ['/app/admin/dashboard'], icon: 'fas fa-home' },
            { label: 'Inmate Management', link: ['/app/admin/inmate-management'] },
            { label: this.inmateId ? 'Edit Inmate' : 'Add Inmate' },
        ];
        if (this.currentTabLabel) {
            base.push({ label: this.currentTabLabel });
        }
        return base;
    }

    get finalStatus(): ApprovalState {
        const a = this.approvalGroup.value as { level1Status: ApprovalState; level2Status: ApprovalState; level3Status: ApprovalState };
        if (a.level1Status === 'Rejected' || a.level2Status === 'Rejected' || a.level3Status === 'Rejected') {
            return 'Rejected';
        }
        if (a.level1Status === 'Approved' && a.level2Status === 'Approved' && a.level3Status === 'Approved') {
            return 'Approved';
        }
        return 'Pending';
    }

    get finalStatusMessage(): string {
        switch (this.finalStatus) {
            case 'Approved':
                return 'All approvals received. Calling features can be activated.';
            case 'Rejected':
                return 'Approval rejected. Review remarks for details.';
            default:
                return 'Waiting for Superintendent Approval';
        }
    }

    isTabInvalid(tab: TabDescriptor): boolean {
        if (tab.group) {
            const grp = this.form.get(tab.group);
            return !!grp && grp.invalid && grp.touched;
        }
        if (tab.controls) {
            return tab.controls.some((name) => {
                const ctrl = this.form.get(name);
                return !!ctrl && ctrl.invalid && ctrl.touched;
            });
        }
        return false;
    }

    /** ------------------------ Wizard nav ------------------------ */

    nextTab(): void {
        if (!this.isLastTab) {
            this.activeTabIndex++;
        }
    }

    prevTab(): void {
        if (!this.isFirstTab) {
            this.activeTabIndex--;
        }
    }

    goToTab(index: number): void {
        if (index >= 0 && index < this.tabs.length) {
            this.activeTabIndex = index;
        }
    }

    /** ------------------------ Tab actions ------------------------ */

    setApproval(level: 1 | 2 | 3, status: ApprovalState): void {
        this.approvalGroup.patchValue({ [`level${level}Status`]: status });
        abp.notify.info(`Level ${level} marked as ${status}.`);
    }

    captureThumb(): void {
        this.biometricGroup.patchValue({ thumbCaptured: true });
        abp.notify.success('Thumb biometric captured (mock).');
    }

    captureFace(): void {
        this.biometricGroup.patchValue({ faceCaptured: true });
        abp.notify.success('Face captured (mock).');
    }

    validateSim(): void {
        const ownerName = (this.audioContactGroup.value.simOwnerName || '').trim();
        if (!ownerName) {
            abp.notify.error('Enter SIM owner name first.');
            return;
        }
        this.audioContactGroup.patchValue({ simOwnerValidated: true });
        abp.notify.success('SIM owner validated (mock).');
    }

    applyPreset(amount: number): void {
        this.rechargeAmount = amount;
    }

    addRecharge(): void {
        if (!this.rechargeAmount || this.rechargeAmount <= 0) {
            abp.notify.error('Enter a valid recharge amount.');
            return;
        }
        this.walletBalance += this.rechargeAmount;
        abp.notify.success(`Wallet recharged by Rs. ${this.rechargeAmount}.`);
        this.rechargeAmount = null;
    }

    submitDeactivation(): void {
        if (!this.deactivateReason) {
            abp.notify.error('Select a deactivation reason.');
            return;
        }
        if (!this.deactivateDocumentName) {
            abp.notify.error('Upload the request document.');
            return;
        }
        abp.notify.success('Deactivation request forwarded to Superintendent (mock).');
        this.deactivateReason = '';
        this.deactivateRemarks = '';
        this.deactivateDocumentName = '';
    }

    onDocumentUpload(
        event: Event,
        target: 'aadhar' | 'passport' | 'license' | 'audioAadhar' | 'videoAadhar' | 'deactivation'
    ): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        switch (target) {
            case 'deactivation':
                this.deactivateDocumentName = file.name;
                break;
            default:
                abp.notify.success(`${file.name} uploaded for ${target} (mock).`);
        }
        input.value = '';
    }

    onPhotoUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            abp.notify.success(`${file.name} uploaded as inmate photo (mock).`);
        }
        input.value = '';
    }

    clearAppIdRow(index: number): void {
        const row = this.appIdsArray.at(index) as FormGroup;
        row?.patchValue({ appId: '', registeredName: '' });
    }

    /** ------------------------ Save / cancel ------------------------ */

    saveAll(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            const failingTab = this.tabs.find((t) => this.isTabInvalid(t));
            if (failingTab) {
                this.activeTabIndex = failingTab.index;
            }
            if (this.form.errors?.['passwordsMismatch']) {
                abp.notify.error('Login password and confirm password do not match.');
                this.activeTabIndex = 0;
            } else {
                abp.notify.error('Please fix the highlighted fields before saving.');
            }
            return;
        }

        const v = this.form.getRawValue();
        const record: InmateRecord = {
            id: this.inmateId ?? 0,
            fullName: v.fullName,
            aliasName: v.aliasName,
            fatherName: v.fatherName,
            gender: v.gender,
            jailNo: v.jailNo,
            prisonId: v.prisonId,
            aadharNumber: v.aadharNumber,
            passportNumber: v.passportNumber,
            drivingLicenseNumber: v.drivingLicenseNumber,
            loginPassword: v.loginPassword,
            audioContact: v.audioContact,
            videoContact: v.videoContact,
            biometric: v.biometric,
            walletBalance: this.walletBalance,
            approval: v.approval,
            status: 'Pending', // recomputed inside MockInmateService.save
        };

        const saved = this.inmateStore.save(record);
        abp.notify.success(`Inmate ${saved.fullName} saved (mock).`);
        this.router.navigate(['/app/admin/inmate-management']);
    }

    cancel(): void {
        this.router.navigate(['/app/admin/inmate-management']);
    }
}
