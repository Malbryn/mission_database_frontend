import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const isAuthorized =
            this.authService.user?.is_staff === route.data['staffOnly'];

        console.log('USER: ', this.authService.user);
        console.log('STAFF ONLY: ', route.data['staffOnly']);

        if (!isAuthorized) {
            this.router.navigate(['notallowed']);
        }

        return isAuthorized;
    }
}
