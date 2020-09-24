import { IUser } from '../../model/user.model';

export enum UsersActionTypes {
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Successful',
  LoadFailed = '[Users] Load Failed',
  UserSelected = '[Users] User Selected',
  ActivateDeactivateUser = '[Users] Activate/Deactivate User',
  EditUser = '[Users] Edit User',
  CancelEditUser = '[Users] Cancel Edit User',
  UpdateUser = '[Users] Update User',
}

export class Load  {
  static readonly type = UsersActionTypes.Load;

  constructor(public payload: number[]) { }
}

export class LoadSuccess  {
  static readonly type = UsersActionTypes.LoadSuccess;

  constructor(public payload: IUser[]) { }
}

export class LoadFail  {
  static readonly type = UsersActionTypes.LoadFailed;

  constructor(public payload: string) { }
}

export class UserSelected  {
  static readonly type = UsersActionTypes.UserSelected;

  constructor(public payload: number) { }
}

export class ActivateDeactivateUser  {
  static readonly type = UsersActionTypes.ActivateDeactivateUser;
}

export class EditUser  {
  static readonly type = UsersActionTypes.EditUser;
}

export class CancelEditUser  {
  static readonly type = UsersActionTypes.CancelEditUser;
}




