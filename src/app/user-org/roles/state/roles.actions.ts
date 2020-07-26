

/* NgRx */
import { Action } from '@ngrx/store';
import { TreeNode } from 'primeng/api';

export enum RolesActionTypes {
  Load = '[Users] Load',
  LoadSuccess = '[Users] Load Success',
  LoadFail = '[Users] Load Fail',
  UserSelected = '[Users] Users Selected'
}

export class Load implements Action {
  readonly type = RolesActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = RolesActionTypes.LoadSuccess;

  constructor(public payload: TreeNode[]) { }
}

export class LoadFail implements Action {
  readonly type = RolesActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class UserSelected implements Action {
  readonly type = RolesActionTypes.UserSelected;

  constructor(public payload: number[]) { }
}

// Union the valid types
export type RolesActions = Load
  | LoadSuccess
  | LoadFail
  | UserSelected;


