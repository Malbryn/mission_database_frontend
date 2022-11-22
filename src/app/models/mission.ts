import { Map } from './map';
import { GameType } from './game-type';
import { User } from './user';
import { Status } from './Status';
import { Modset } from './modset';
import { DLC } from './dlc';
import { MissionFile } from './mission-file';
import { AbstractData } from './abstract-data';

export interface Mission extends AbstractData {
    name: string;
    map: Map;
    author: string;
    gameType: GameType;
    slotsMin: number;
    slotsMax: number;
    createdAt: string;
    createdBy: User;
    status: Status;
    modset: Modset;
    dlcs: DLC[];
    description: string;
    missionFiles: MissionFile[];
}
