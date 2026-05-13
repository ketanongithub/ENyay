import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const requiredRoles = route.data['roles'] as string[];

    return this.authService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          return this.router.createUrlTree(['/auth/login']);
        }

        const hasRole = requiredRoles.some((role) => user.roles.includes(role));
        if (hasRole) {
          return true;
        }

        return this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}
