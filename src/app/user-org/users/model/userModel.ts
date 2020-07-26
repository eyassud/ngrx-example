
export interface IRole {
  orgId: number;
  roleId: number;
}

export interface IUser {
   id: number;
   lastName: string;
   firstName: string;
   middleInitial: string;
   active: boolean;
   roles: Array<IRole>;
 }
