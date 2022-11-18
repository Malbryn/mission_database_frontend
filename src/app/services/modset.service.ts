import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Modset } from '../models/modset';

@Injectable()
export class ModsetService extends CRUDService<Modset> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/modsets/');
    }
}
