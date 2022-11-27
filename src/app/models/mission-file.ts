import { AbstractData } from './abstract-data';
import { Mission } from './mission';
import { User } from './user';

export interface MissionFile extends AbstractData {
    mission: Mission;
    name: string;
    version: number;
    path: string;
    downloadUrl: string;
    sha: string;
    description: string;
    createdBy: User;
    createdAt: string;
    file: File;
}
