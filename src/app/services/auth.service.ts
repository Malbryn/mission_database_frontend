import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    static readonly STORAGE_KEY = 'accessToken';

    currentUser: BehaviorSubject<User>;

    constructor(private router: Router, private http: HttpClient) {
        const user = {} as User;
        user.accessToken = this.getAccessTokenFromStorage();

        this.currentUser = new BehaviorSubject<User>(user);
    }

    logIn(
        username: string,
        password: string,
        rememberUser: boolean
    ): Observable<User> {
        return this.http
            .post<User>(`${environment.API_URL}/auth/login/`, {
                username,
                password,
            })
            .pipe(
                map((user: User) => {
                    if (!user.accessToken)
                        throw new Error('User access token is empty.');

                    this.saveAccessToken(user.accessToken, rememberUser);
                    this.currentUser.next(user);

                    return user;
                })
            );
    }

    logOut(): void {
        this.deleteAccessToken();
        this.currentUser.next({} as User);
        this.router.navigate(['/auth/login']);
    }

    private getAccessTokenFromStorage(): string | null {
        let token = localStorage.getItem(AuthService.STORAGE_KEY);

        if (!token) {
            token = sessionStorage.getItem(AuthService.STORAGE_KEY);
        }

        return token;
    }

    private saveAccessToken(token: string, isPersistent: boolean): void {
        if (isPersistent) {
            localStorage.setItem(AuthService.STORAGE_KEY, token);
        } else {
            sessionStorage.setItem(AuthService.STORAGE_KEY, token);
        }
    }

    private deleteAccessToken(): void {
        localStorage.removeItem(AuthService.STORAGE_KEY);
        sessionStorage.removeItem(AuthService.STORAGE_KEY);
    }
}
