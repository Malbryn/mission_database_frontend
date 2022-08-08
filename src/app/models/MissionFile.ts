import { Mission } from './Mission';

export interface MissionFile {
    id?: number;
    mission?: Mission;
    name?: string;
    path?: string;
    downloadURL?: string;
    version?: number;
    notes?: string;
    createdAt?: string;
    file?: string;
}
