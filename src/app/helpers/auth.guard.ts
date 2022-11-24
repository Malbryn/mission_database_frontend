import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { UserRole } from '../models/user-role';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUser.value;
        const userRole = this.getUserRole(currentUser);

        if (currentUser.accessToken && userRole !== UserRole.UNKNOWN) {
            const requiredRole = route.data['role'];

            if (requiredRole <= userRole) {
                return true;
            } else {
                this.router.navigate(['/notallowed']);
                return false;
            }
        }

        this.router.navigate(['/auth/login']);
        return false;
    }

    private getUserRole(user: User): UserRole {
        if (user['isAdmin']) return UserRole.ADMIN;
        if (user['isStaff']) return UserRole.STAFF;
        if (user['isCreator']) return UserRole.CREATOR;
        if (user['isMember']) return UserRole.MEMBER;

        return UserRole.UNKNOWN;
    }
}
