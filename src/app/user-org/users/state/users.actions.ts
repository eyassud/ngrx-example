import { IUser } from '../../model/user.model';

export enum UsersActionTypes {
  Load = '[Users] Load',

  UserSelected = '[Users] User Selected'
}

export class Load  {
  static readonly type = UsersActionTypes.Load;
  constructor(public payload: number[]) { }
}

export class UserSelected  {
  static readonly type = UsersActionTypes.UserSelected;

  constructor(public payload: number) { }
}



