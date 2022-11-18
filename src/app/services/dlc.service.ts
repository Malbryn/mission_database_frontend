import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { DLC } from '../models/dlc';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DLCService extends CRUDService<DLC> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/dlcs/');
    }
}
