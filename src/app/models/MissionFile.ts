import { Mission } from './Mission';

export interface MissionFile {
    id: number;
    mission: Mission;
    name: string;
    path: string;
    downloadUrl: string;
    version: number;
    description: string;
    createdAt: string;
    file: string;
}
