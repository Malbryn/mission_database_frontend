import { AbstractData } from './abstract-data';

export interface User extends AbstractData {
    username: string;
    isMember: boolean;
    isCreator: boolean;
    isStaff: boolean;
    isAdmin: boolean;
    createdAt: number;
    lastLogin: number;
    accessToken: string | null;
}
