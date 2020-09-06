import { TreeNode } from 'primeng/api';

export enum OrganizationActionTypes {
  Load = '[Organization] Load',
  LoadSuccess = '[Organization] Load Success',
  LoadFail = '[Organization] Load Fail',
  OrganizationSelected = '[Organization] Organization Selected'
}

export class Load {
  static readonly type = OrganizationActionTypes.Load;
}

export class LoadSuccess {
  static readonly type = OrganizationActionTypes.LoadSuccess;
  constructor(public payload: TreeNode[]) { }
}

export class LoadFail {
  static readonly type = OrganizationActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class OrgSelected {
  static readonly type = OrganizationActionTypes.OrganizationSelected;

  constructor(public payload: number[]) { }
}

