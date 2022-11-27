import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Framework } from '../models/framework';

@Injectable()
export class FrameworkService extends CRUDService<Framework> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/frameworks/');
    }
}
