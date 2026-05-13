import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, AuthToken } from '../models';
import { APP_CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  getToken(): string | null {
    return localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  }

  setToken(token: AuthToken): void {
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token.accessToken);
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, token.refreshToken);
    this.isAuthenticatedSubject.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<boolean> {
    this.removeToken();
    return of(true);
  }
}
