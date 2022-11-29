import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { CRUDService } from './crud.service';

@Injectable()
export class UserService extends CRUDService<User> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/users/');
    }
}
