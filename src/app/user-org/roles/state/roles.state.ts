import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { asapScheduler, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRole } from '../../model/role.model';
import { RolesService } from '../roles.service';
import * as RolesActionTypes from './roles.actions';

export const ROLES_STATE_TOKEN = new StateToken<RolesStateModel>('roles');

export interface RolesStateModel {
  roles: IRole[];
  loading: boolean;
  error: string;
}

const initialState: RolesStateModel = {
  roles: [],
  loading: false,
  error: '',
};

@State<RolesStateModel>({
  name: ROLES_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class RolesState {
  @Selector([ROLES_STATE_TOKEN])
  static loading(state: RolesStateModel) {
    return state.loading;
  }

  @Selector([ROLES_STATE_TOKEN])
  static error(state: RolesStateModel) {
    return state.error;
  }

  constructor(private rolesService: RolesService) { }

  @Action(RolesActionTypes.Load)
  load(ctx: StateContext<RolesStateModel>, action: RolesActionTypes.Load) {
    ctx.patchState({ loading: true });

    return this.rolesService.getRoles()
      .pipe(
        map(roles => asapScheduler.schedule(() =>
          ctx.dispatch(new RolesActionTypes.LoadSuccess(roles)))),
        catchError(() =>
          throwError(asapScheduler.schedule(
            () => ctx.dispatch(new RolesActionTypes.LoadFail('Loading roles failed')))
          )));
  }

  @Action(RolesActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<RolesStateModel>, action: RolesActionTypes.LoadSuccess) {
    ctx.patchState({ loading: false, roles: action.payload });
  }

  @Action(RolesActionTypes.LoadFail)
  loadFail(ctx: StateContext<RolesStateModel>, action: RolesActionTypes.LoadFail) {
    ctx.patchState({ loading: false, roles: [], error: action.payload });
  }
}

