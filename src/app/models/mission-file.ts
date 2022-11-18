import { AbstractData } from './abstract-data';

export interface MissionFile extends AbstractData {
    mission: number;
    name: string;
    version: number;
    path: string;
    downloadUrl: string;
    description: string;
    createdBy: number;
    createdAt: string;
    file: File;
}
