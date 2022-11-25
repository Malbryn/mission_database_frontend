import { AbstractData } from './abstract-data';

export interface MissionFileDto extends AbstractData {
    missionId: number;
    name: string;
    version: number;
    path: string;
    downloadUrl: string;
    description: string;
    createdById: number;
    createdAt: string;
    file: File;
}
