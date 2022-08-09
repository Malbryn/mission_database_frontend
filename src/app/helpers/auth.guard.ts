import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;

        console.log('AUTH GUARD - USER: ', user);

        if (user) {
            console.log('-> USER NOT NULL');
            const allowedRole = route.data['roles'][0];

            if (allowedRole && user['roles']?.indexOf(allowedRole) === -1) {
                this.router.navigate(['/']);
                return false;
            }

            return true;
        }

        this.router.navigate(['/auth/login']);

        return false;
    }
}
