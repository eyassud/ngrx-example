
import { IRole } from '../../model/role.model';

export enum RolesActionTypes {
  Load = '[Roles] Load',
  LoadSuccess = '[Roles] Load Success',
  LoadFail = '[Roles] Load Fail'
}

export class Load {
  static readonly type = RolesActionTypes.Load;
  
  constructor(public payload: number){}
}

export class LoadSuccess {
  static readonly type = RolesActionTypes.LoadSuccess;

  constructor(public payload: IRole[]) { }
}

export class LoadFail {
  static readonly type = RolesActionTypes.LoadFail;

  constructor(public payload: string) { }
}


