import { Map } from './Map';
import { GameType } from './GameType';
import { User } from './User';
import { Status } from './Status';
import { Modset } from './Modset';
import { DLC } from './DLC';
import { MissionFile } from './MissionFile';

export interface Mission {
    id: number;
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
    dlc: DLC;
    description: string;
    missionFiles: MissionFile;
}
