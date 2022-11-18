import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${environment.API_URL}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.API_URL}/users/${id}`);
    }
}
