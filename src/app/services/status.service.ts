import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/status';

@Injectable()
export class StatusService extends CRUDService<Status> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/statuses/');
    }
}
