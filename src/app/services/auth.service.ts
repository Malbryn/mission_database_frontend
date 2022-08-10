import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public user: Observable<User>;
    private userSubject: BehaviorSubject<User>;

    constructor(private router: Router, private http: HttpClient) {
        const userString = this.getUserFromLocalStorage();

        this.userSubject = new BehaviorSubject<User>(
            userString !== '' ? JSON.parse(userString) : null
        );

        this.user = this.userSubject.asObservable();
    }

    get userValue(): User {
        return this.userSubject.value;
    }

    logIn(username: string, password: string) {
        return this.http
            .post<any>(`${environment.API_URL}/auth/authenticate/`, {
                username,
                password,
            })
            .pipe(
                map((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);

                    return user;
                })
            );
    }

    logOut(): void {
        localStorage.removeItem('user');
        this.userSubject.next(null as any);
        this.router.navigate(['/auth/login']);
    }

    private getUserFromLocalStorage(): string {
        const user = localStorage.getItem('user');

        return user ?? '';
    }
}
