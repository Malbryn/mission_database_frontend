import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DLC } from '../api/DLC';
import { GameType } from '../api/GameType';
import { Map } from '../api/Map';
import { Mission } from '../api/Mission';
import { MissionFile } from '../api/MissionFile';
import { Modset } from '../api/Modset';
import { Status } from '../api/Status';

@Injectable()
export class MissionService {
    httpOptions = {
        headers: {},
    };

    constructor(private http: HttpClient) {}

    getDLCs(): Promise<DLC[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/dlcs/', this.httpOptions)
            .toPromise()
            .then((response) => response as DLC[])
            .then((data) => data);
    }

    getGameTypes(): Promise<GameType[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/game_types/', this.httpOptions)
            .toPromise()
            .then((response) => response as GameType[])
            .then((data) => data);
    }

    getMaps(): Promise<Map[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/maps/', this.httpOptions)
            .toPromise()
            .then((response) => response as Map[])
            .then((data) => data);
    }

    getMissions(): Promise<Mission[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/missions/', this.httpOptions)
            .toPromise()
            .then((response) => response as Mission[])
            .then((data) => data);
    }

    getMissionFiles(): Promise<MissionFile[]> {
        return this.http
            .get<any>(
                'http://127.0.0.1:8000/api/mission_files/',
                this.httpOptions
            )
            .toPromise()
            .then((response) => response as MissionFile[])
            .then((data) => data);
    }

    getModsets(): Promise<Modset[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/modsets/', this.httpOptions)
            .toPromise()
            .then((response) => response as Modset[])
            .then((data) => data);
    }

    getStatuses(): Promise<Status[]> {
        return this.http
            .get<any>('http://127.0.0.1:8000/api/statuses/', this.httpOptions)
            .toPromise()
            .then((response) => response as Status[])
            .then((data) => data);
    }
}
