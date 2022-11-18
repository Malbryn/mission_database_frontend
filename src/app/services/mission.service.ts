import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/mission';

@Injectable()
export class MissionService extends CRUDService<Mission> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/missions/');
    }
}
