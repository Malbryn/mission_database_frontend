import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from '../api/User';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_NAME = 'auth_token';
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();
    user!: User;

    constructor(private apiService: ApiService, public router: Router) {
        this._isLoggedIn$.next(!!this.token);
        // this.apiService.getUser(this.getUserID(this.token)).then((user) => {
        //     this.user = user;
        // });
    }

    get token(): string {
        const token = localStorage.getItem(this.TOKEN_NAME);
        return token !== null ? token : '';
    }

    logIn(username: string, password: string): Observable<any> {
        return this.apiService.logIn(username, password).pipe(
            tap((response: any) => {
                localStorage.setItem(this.TOKEN_NAME, response.access);

                this.apiService
                    .getUser(this.getUserID(response.access))
                    .then((user) => {
                        this.user = user;
                        console.log('USER:', this.user);
                    })
                    .then(() => {
                        this._isLoggedIn$.next(true);
                    });
            })
        );
    }

    private getUserID(token: string): number {
        return JSON.parse(atob(token.split('.')[1])).user_id;
    }
}
