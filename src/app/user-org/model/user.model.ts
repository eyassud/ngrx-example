import { IRole } from './role.model';

export interface IUser {
   key: number;
   lastName: string;
   firstName: string;
   middleInitial: string;
   active: boolean;
   roles: Array<IRole>;
 }
