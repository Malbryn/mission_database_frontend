import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { GameType } from '../models/game-type';

@Injectable()
export class GameTypeService extends CRUDService<GameType> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, '/game-types/');
    }
}
