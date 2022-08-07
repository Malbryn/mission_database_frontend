import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_NAME = 'auth_token';
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private apiService: ApiService, public router: Router) {
        this._isLoggedIn$.next(!!this.token);
    }

    get token(): string {
        const token = localStorage.getItem(this.TOKEN_NAME);
        return token !== null ? token : '';
    }

    logIn(username: string, password: string): Observable<any> {
        return this.apiService.logIn(username, password).pipe(
            tap((response: any) => {
                localStorage.setItem(this.TOKEN_NAME, response.access);
                this._isLoggedIn$.next(true);
            })
        );
    }
}
