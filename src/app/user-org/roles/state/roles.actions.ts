

/* NgRx */
import { Action } from '@ngrx/store';
import { IRole } from '../../model/role.model';

export enum RolesActionTypes {
  Load = '[Roles] Load',
  LoadSuccess = '[Roles] Load Success',
  LoadFail = '[Roles] Load Fail'
}

export class Load implements Action {
  readonly type = RolesActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = RolesActionTypes.LoadSuccess;

  constructor(public payload: IRole[]) { }
}

export class LoadFail implements Action {
  readonly type = RolesActionTypes.LoadFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type RolesActions = Load
  | LoadSuccess
  | LoadFail;


