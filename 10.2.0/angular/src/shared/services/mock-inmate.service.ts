import { Injectable } from '@angular/core';

export type ApprovalState = 'Pending' | 'Approved' | 'Rejected';
export type GenderOption = 'Male' | 'Female' | 'Transgender';
export type InmateStatus = 'Active' | 'Pending' | 'Inactive';

export interface VideoAppId {
    appId: string;
    registeredName: string;
}

export interface AudioContact {
    fullName: string;
    fatherName: string;
    relation: string;
    contactNumber1: string;
    contactNumber2: string;
    simOwnerName: string;
    simOwnerValidated: boolean;
}

export interface VideoContact {
    fullName: string;
    fatherName: string;
    relation: string;
    appIds: VideoAppId[];
}

export interface ApprovalWorkflow {
    level1Status: ApprovalState;
    level1Remarks: string;
    level2Status: ApprovalState;
    level2Remarks: string;
    level3Status: ApprovalState;
    level3Remarks: string;
}

export interface InmateRecord {
    id: number;

    // Section 1 — Inmate Details (Create Login Credential)
    fullName: string;
    aliasName: string;
    fatherName: string;
    gender: GenderOption;
    jailNo: string;
    prisonId: string;
    aadharNumber: string;
    passportNumber: string;
    drivingLicenseNumber: string;
    loginPassword: string;

    // Section 2 — Family Audio Call
    audioContact: AudioContact;

    // Section 3 — Family Video Call
    videoContact: VideoContact;

    // Section 4 — Biometric & Face Recognition
    biometric: {
        thumbCaptured: boolean;
        faceCaptured: boolean;
    };

    // Section 5 — Wallet & Recharge
    walletBalance: number;

    // Section 6 — Approval Workflow (Three Level)
    approval: ApprovalWorkflow;

    // Display column on the list grid (kept in sync with approval levels).
    status: InmateStatus;
}

const RELATIONS = ['Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Son', 'Daughter', 'Friend', 'Other'] as const;

/**
 * Default empty record used when creating a new inmate. Centralised here so
 * the form never has to reach for a literal — keeps every field accounted for
 * even if we add new ones later.
 */
export function emptyInmate(): InmateRecord {
    return {
        id: 0,
        fullName: '',
        aliasName: '',
        fatherName: '',
        gender: 'Male',
        jailNo: '',
        prisonId: '',
        aadharNumber: '',
        passportNumber: '',
        drivingLicenseNumber: '',
        loginPassword: '',
        audioContact: {
            fullName: '',
            fatherName: '',
            relation: '',
            contactNumber1: '',
            contactNumber2: '',
            simOwnerName: '',
            simOwnerValidated: false,
        },
        videoContact: {
            fullName: '',
            fatherName: '',
            relation: '',
            appIds: [
                { appId: '', registeredName: '' },
                { appId: '', registeredName: '' },
                { appId: '', registeredName: '' },
            ],
        },
        biometric: { thumbCaptured: false, faceCaptured: false },
        walletBalance: 0,
        approval: {
            level1Status: 'Pending',
            level1Remarks: '',
            level2Status: 'Pending',
            level2Remarks: '',
            level3Status: 'Pending',
            level3Remarks: '',
        },
        status: 'Pending',
    };
}

/**
 * Single in-memory mock store for inmates. Both InmateListComponent and
 * CreateEditInmateComponent read from / write to this service so the edit
 * flow round-trips through the same array the list shows.
 *
 * No backend is involved — when the project wires real APIs in, replace the
 * synchronous returns with HTTP observables and update consumers accordingly.
 */
@Injectable({ providedIn: 'root' })
export class MockInmateService {
    static readonly RELATIONS = RELATIONS;

    private readonly inmates: InmateRecord[] = [
        this.seed({
            id: 1,
            fullName: 'Rahul Sharma',
            aliasName: 'Rahul',
            fatherName: 'Mahesh Sharma',
            gender: 'Male',
            jailNo: 'PID-1001',
            prisonId: 'PR-1001',
            aadharNumber: '1234-5678-9012',
            audioRelation: 'Brother',
            audioPhone: '9876500001',
            videoApp: 'rahul.sharma@enyaypath',
            walletBalance: 1250,
            approvals: ['Approved', 'Approved', 'Approved'],
            status: 'Active',
        }),
        this.seed({
            id: 2,
            fullName: 'Amit Kumar',
            aliasName: '',
            fatherName: 'Suresh Kumar',
            gender: 'Male',
            jailNo: 'PID-1002',
            prisonId: 'PR-1002',
            aadharNumber: '2345-6789-0123',
            audioRelation: 'Father',
            audioPhone: '9876500002',
            videoApp: 'amit.kumar@enyaypath',
            walletBalance: 500,
            approvals: ['Approved', 'Pending', 'Pending'],
            status: 'Pending',
        }),
        this.seed({
            id: 3,
            fullName: 'Priya Singh',
            aliasName: 'Pri',
            fatherName: 'Rajesh Singh',
            gender: 'Female',
            jailNo: 'PID-1003',
            prisonId: 'PR-1003',
            aadharNumber: '3456-7890-1234',
            audioRelation: 'Sister',
            audioPhone: '9876500003',
            videoApp: 'priya.singh@enyaypath',
            walletBalance: 2000,
            approvals: ['Approved', 'Approved', 'Approved'],
            status: 'Active',
        }),
        this.seed({
            id: 4,
            fullName: 'Vikas Yadav',
            aliasName: '',
            fatherName: 'Mohan Yadav',
            gender: 'Male',
            jailNo: 'PID-1004',
            prisonId: 'PR-1004',
            aadharNumber: '4567-8901-2345',
            audioRelation: 'Mother',
            audioPhone: '9876500004',
            videoApp: '',
            walletBalance: 0,
            approvals: ['Approved', 'Rejected', 'Pending'],
            status: 'Inactive',
        }),
        this.seed({
            id: 5,
            fullName: 'Sunita Devi',
            aliasName: 'Suni',
            fatherName: 'Ramesh Prasad',
            gender: 'Female',
            jailNo: 'PID-1005',
            prisonId: 'PR-1005',
            aadharNumber: '5678-9012-3456',
            audioRelation: 'Spouse',
            audioPhone: '9876500005',
            videoApp: 'sunita.devi@enyaypath',
            walletBalance: 750,
            approvals: ['Approved', 'Approved', 'Approved'],
            status: 'Active',
        }),
        this.seed({
            id: 6,
            fullName: 'Arjun Reddy',
            aliasName: '',
            fatherName: 'Vijay Reddy',
            gender: 'Male',
            jailNo: 'PID-1006',
            prisonId: 'PR-1006',
            aadharNumber: '6789-0123-4567',
            audioRelation: 'Brother',
            audioPhone: '9876500006',
            videoApp: '',
            walletBalance: 1500,
            approvals: ['Pending', 'Pending', 'Pending'],
            status: 'Pending',
        }),
        this.seed({
            id: 7,
            fullName: 'Neha Gupta',
            aliasName: 'Nehu',
            fatherName: 'Anil Gupta',
            gender: 'Female',
            jailNo: 'PID-1007',
            prisonId: 'PR-1007',
            aadharNumber: '7890-1234-5678',
            audioRelation: 'Father',
            audioPhone: '9876500007',
            videoApp: 'neha.gupta@enyaypath',
            walletBalance: 3200,
            approvals: ['Approved', 'Approved', 'Approved'],
            status: 'Active',
        }),
    ];

    list(keyword?: string): InmateRecord[] {
        const term = (keyword || '').trim().toLowerCase();
        if (!term) {
            return this.inmates.slice();
        }
        return this.inmates.filter(
            (i) =>
                i.fullName.toLowerCase().includes(term) ||
                i.fatherName.toLowerCase().includes(term) ||
                i.jailNo.toLowerCase().includes(term) ||
                i.prisonId.toLowerCase().includes(term) ||
                i.aliasName.toLowerCase().includes(term)
        );
    }

    get(id: number): InmateRecord | undefined {
        return this.inmates.find((i) => i.id === id);
    }

    /**
     * Upsert: existing id overwrites the row; missing id is assigned the next
     * sequential id and pushed onto the end of the list. Returns the saved
     * record so the caller can re-bind to it.
     */
    save(record: InmateRecord): InmateRecord {
        const next = { ...record, status: this.deriveStatus(record.approval) };
        if (next.id) {
            const idx = this.inmates.findIndex((i) => i.id === next.id);
            if (idx >= 0) {
                this.inmates[idx] = next;
                return next;
            }
        }
        next.id = this.nextId();
        this.inmates.push(next);
        return next;
    }

    delete(id: number): boolean {
        const idx = this.inmates.findIndex((i) => i.id === id);
        if (idx < 0) {
            return false;
        }
        this.inmates.splice(idx, 1);
        return true;
    }

    private deriveStatus(approval: ApprovalWorkflow): InmateStatus {
        const levels = [approval.level1Status, approval.level2Status, approval.level3Status];
        if (levels.every((s) => s === 'Approved')) {
            return 'Active';
        }
        if (levels.some((s) => s === 'Rejected')) {
            return 'Inactive';
        }
        return 'Pending';
    }

    private nextId(): number {
        return this.inmates.reduce((m, i) => Math.max(m, i.id), 0) + 1;
    }

    private seed(opts: {
        id: number;
        fullName: string;
        aliasName: string;
        fatherName: string;
        gender: GenderOption;
        jailNo: string;
        prisonId: string;
        aadharNumber: string;
        audioRelation: string;
        audioPhone: string;
        videoApp: string;
        walletBalance: number;
        approvals: [ApprovalState, ApprovalState, ApprovalState];
        status: InmateStatus;
    }): InmateRecord {
        return {
            id: opts.id,
            fullName: opts.fullName,
            aliasName: opts.aliasName,
            fatherName: opts.fatherName,
            gender: opts.gender,
            jailNo: opts.jailNo,
            prisonId: opts.prisonId,
            aadharNumber: opts.aadharNumber,
            passportNumber: '',
            drivingLicenseNumber: '',
            loginPassword: '',
            audioContact: {
                fullName: opts.fatherName,
                fatherName: '',
                relation: opts.audioRelation,
                contactNumber1: opts.audioPhone,
                contactNumber2: '',
                simOwnerName: opts.fatherName,
                simOwnerValidated: opts.audioPhone !== '',
            },
            videoContact: {
                fullName: opts.fatherName,
                fatherName: '',
                relation: opts.audioRelation,
                appIds: [
                    { appId: opts.videoApp, registeredName: opts.fatherName },
                    { appId: '', registeredName: '' },
                    { appId: '', registeredName: '' },
                ],
            },
            biometric: {
                thumbCaptured: opts.status === 'Active',
                faceCaptured: opts.status === 'Active',
            },
            walletBalance: opts.walletBalance,
            approval: {
                level1Status: opts.approvals[0],
                level1Remarks: '',
                level2Status: opts.approvals[1],
                level2Remarks: '',
                level3Status: opts.approvals[2],
                level3Remarks: '',
            },
            status: opts.status,
        };
    }
}
