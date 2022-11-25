import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { MissionFile } from '../models/mission-file';
import { Observable } from 'rxjs';

@Injectable()
export class MissionFileService extends CRUDService<MissionFile> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/mission-files/');
    }

    downloadFile(id: number): Observable<any> {
        return this.http.get(this.URL + id + '/download', {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'blob',
        });
    }
}
