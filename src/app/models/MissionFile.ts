export interface MissionFile {
    id: number;
    mission: number;
    name: string;
    path: string;
    downloadUrl: string;
    version: number;
    description: string;
    createdAt: string;
    file: File;
}
