import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    logIn(username: string, password: string): Observable<any> {
        return this.http.post('http://127.0.0.1:8000/api/auth/log-in/', {
            username,
            password,
        });
    }
}
