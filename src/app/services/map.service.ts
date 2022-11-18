import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Map } from '../models/map';

@Injectable()
export class MapService extends CRUDService<Map> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/maps/');
    }
}
