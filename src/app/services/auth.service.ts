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
    static readonly LOCAL_STORAGE_KEY = 'accessToken';

    currentUser: BehaviorSubject<User>;

    constructor(private router: Router, private http: HttpClient) {
        const user = {} as User;
        user.accessToken = this.getAccessTokenFromLocalStorage();

        this.currentUser = new BehaviorSubject<User>(user);
    }

    logIn(username: string, password: string): Observable<User> {
        return this.http
            .post<User>(`${environment.API_URL}/auth/login/`, {
                username,
                password,
            })
            .pipe(
                map((user: User) => {
                    if (!user.accessToken)
                        throw new Error('User access token is empty.');

                    this.saveAccessToken(user.accessToken);
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

    /*getCurrentUser(): void {
        if (!this.accessToken) {
            this.currentUser.next(null);
            return;
        }

        this.http.get<User>(`${environment.API_URL}/users/me`).subscribe({
            next: (user: User) => {
                if (this.accessToken !== null) {
                    user.accessToken = this.accessToken;
                }

                this.currentUser.next(user);
            },
            error: (error) => console.error('Cannot get current user: ', error),
        });
    }*/

    private getAccessTokenFromLocalStorage(): string | null {
        return localStorage.getItem(AuthService.LOCAL_STORAGE_KEY);
    }

    private saveAccessToken(token: string): void {
        localStorage.setItem(AuthService.LOCAL_STORAGE_KEY, token);
    }

    private deleteAccessToken(): void {
        localStorage.removeItem(AuthService.LOCAL_STORAGE_KEY);
    }
}
