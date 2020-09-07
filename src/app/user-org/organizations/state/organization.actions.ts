import { TreeNode } from 'primeng/api';

export enum OrganizationActionTypes {
  Load = '[Organization] Load',
  OrganizationSelected = '[Organization] Organization Selected',
  OrganizationExpanded = '[Organization] Organization Expanded'
}

export class Load {
  static readonly type = OrganizationActionTypes.Load;
}

export class OrgSelected {
  static readonly type = OrganizationActionTypes.OrganizationSelected;

  constructor(public payload: number[]) { }
}

export class OrgExpanded {
  static readonly type = OrganizationActionTypes.OrganizationExpanded;

  constructor(public payload: number) { }
}

