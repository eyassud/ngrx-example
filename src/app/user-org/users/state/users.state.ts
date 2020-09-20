import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, catchError } from 'rxjs/operators';
import { asapScheduler, throwError } from 'rxjs';

export interface ButtonStates {
    deactivateDisabled: boolean;
    addRoleDisabled: boolean;
}
export interface UsersStateModel {
  users: IUser[];
  selectedUsersId: number | null;
  loading: boolean;
  error: string;
  buttonStates: ButtonStates;
}

const initialState: UsersStateModel = {
  users: [],
  selectedUsersId: null,
  loading: false,
  error: '',
  buttonStates: {
    deactivateDisabled: true,
    addRoleDisabled: true
  }
};

export const USERS_STATE_TOKEN = new StateToken<UsersStateModel>('users');

@State<UsersStateModel>({
  name: USERS_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) { }

  @Action(UserActionTypes.Load)
  load(ctx: StateContext<UsersStateModel>, action: UserActionTypes.Load) {
    ctx.patchState({ loading: true });

    return this.usersService.getUsers(action.payload)
      .pipe(
        map(users => asapScheduler.schedule(() =>
          ctx.dispatch(new UserActionTypes.LoadSuccess(users)))),
        catchError(() =>
          throwError(asapScheduler.schedule(
            () => ctx.dispatch(new UserActionTypes.LoadFail('Loading users failed')))
          )));
  }

  @Action(UserActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<UsersStateModel>, action: UserActionTypes.LoadSuccess) {
    ctx.patchState({ loading: false, users: action.payload });
  }

  @Action(UserActionTypes.LoadFail)
  loadFail(ctx: StateContext<UsersStateModel>, action: UserActionTypes.LoadFail) {
    ctx.patchState({ loading: false, users: [], error: action.payload });
  }

  @Action(UserActionTypes.UserSelected)
  organizationSelected(ctx: StateContext<UsersStateModel>, action: UserActionTypes.UserSelected) {
    const selectedUser = ctx.getState().users.find(u => u.key === action.payload);

    ctx.patchState({
      selectedUsersId: action.payload,
      buttonStates : {
        deactivateDisabled : !selectedUser.active,
        addRoleDisabled: !selectedUser.active
      }
    });
  }
}

