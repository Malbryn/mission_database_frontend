import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { MissionFile } from '../models/MissionFile';

@Injectable()
export class MissionFileService extends CRUDService<MissionFile> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/mission_files/');
    }
}
