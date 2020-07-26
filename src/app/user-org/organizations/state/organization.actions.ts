

/* NgRx */
import { Action } from '@ngrx/store';
import { TreeNode } from 'primeng/api';

export enum OrganizationActionTypes {
  Load = '[Organization] Load',
  LoadSuccess = '[Organization] Load Success',
  LoadFail = '[Organization] Load Fail',
  OrgSelected = '[Organization] Organization Selected'
}

export class Load implements Action {
  readonly type = OrganizationActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = OrganizationActionTypes.LoadSuccess;

  constructor(public payload: TreeNode[]) { }
}

export class LoadFail implements Action {
  readonly type = OrganizationActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class OrgSelected implements Action {
  readonly type = OrganizationActionTypes.OrgSelected;

  constructor(public payload: number[]) { }
}

// Union the valid types
export type OrganizationActions = Load
  | LoadSuccess
  | LoadFail
  | OrgSelected;


