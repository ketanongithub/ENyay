import { Injectable } from '@angular/core';

export interface MockInmateSession {
    prisonId: string;
    signedInAt: string;
}

/**
 * Manages the inmate-side mock authentication session in localStorage.
 *
 * The inmate flow on this branch is fully mock — there is no backend call.
 * This service is the single owner of the `mockInmateSession` localStorage
 * key, so the LoginComponent / InmatePortalComponent / future inmate guards
 * never touch `localStorage` directly.
 */
@Injectable({ providedIn: 'root' })
export class MockInmateSessionService {
    private static readonly STORAGE_KEY = 'mockInmateSession';

    set(prisonId: string): MockInmateSession {
        const session: MockInmateSession = {
            prisonId,
            signedInAt: new Date().toISOString(),
        };
        try {
            localStorage.setItem(MockInmateSessionService.STORAGE_KEY, JSON.stringify(session));
        } catch {
            // localStorage may be unavailable (private mode, SSR); the mock
            // flow still proceeds via in-memory navigation.
        }
        return session;
    }

    get(): MockInmateSession | null {
        try {
            const raw = localStorage.getItem(MockInmateSessionService.STORAGE_KEY);
            return raw ? (JSON.parse(raw) as MockInmateSession) : null;
        } catch {
            return null;
        }
    }

    clear(): void {
        try {
            localStorage.removeItem(MockInmateSessionService.STORAGE_KEY);
        } catch {
            // localStorage may be unavailable; nothing to clear.
        }
    }

    isSignedIn(): boolean {
        return !!this.get();
    }
}
