import { AbstractData } from './abstract-data';

export interface MissionDto extends AbstractData {
    name: string;
    mapId: number;
    author: string;
    gameTypeId: number;
    slotsMin: number;
    slotsMax: number;
    createdById: number;
    statusId: number;
    modsetId: number;
    frameworkId: number;
    dlcs: number[];
    description: string;
    notes: string;
}
