import { Action } from '@ngrx/store';
import { IUser } from '../../model/user.model';

export enum UsersActionTypes {
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Success',
  LoadFail = '[Users] Load Fail',
  UserSelected = '[Users] User Selected'
}

export class Load implements Action {
  readonly type = UsersActionTypes.Load;

  constructor(public payload: number[]) { }
}

export class LoadSuccess implements Action {
  readonly type = UsersActionTypes.LoadSuccess;

  constructor(public payload: IUser[]) { }
}

export class LoadFail implements Action {
  readonly type = UsersActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class UserSelected implements Action {
  readonly type = UsersActionTypes.UserSelected;

  constructor(public payload: number) { }
}

// Union the valid types
export type UsersActions = Load
  | LoadSuccess
  | LoadFail
  | UserSelected;


