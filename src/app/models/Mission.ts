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
    game_type: GameType;
    slots_min: number;
    slots_max: number;
    createdAt: string;
    createdBy: User;
    status: Status;
    modset: Modset;
    dlc: DLC[];
    description: string;
    missionFiles: MissionFile;
}
