import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    httpOptions = {
        headers: {},
    };

    constructor(private http: HttpClient) {}

    logIn(username: string, password: string): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/auth/log-in/', {
            username,
            password,
        });
    }

    getUser(id: number): Promise<User> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/users/' + id, this.httpOptions)
            .toPromise()
            .then((response) => response as User)
            .then((data) => data);
    }
}
