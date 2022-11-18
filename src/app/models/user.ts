import { Role } from './role';
import { AbstractData } from './abstract-data';

export interface User extends AbstractData {
    username: string;
    roles: Role[];
    accessToken?: string;
    refreshToken?: string;
}
