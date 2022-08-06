import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Map } from '../api/Map';
import { Mission } from '../api/Mission';

@Injectable()
export class MissionService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('malbryn:admin'), // TODO: env this
        }),
    };

    constructor(private http: HttpClient) {}

    getMaps() {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/maps/', this.httpOptions)
            .toPromise()
            .then((response) => response as Map[])
            .then((data) => data);
    }

    getMissions() {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/missions/', this.httpOptions)
            .toPromise()
            .then((response) => response as Mission[])
            .then((data) => data);
    }
}
