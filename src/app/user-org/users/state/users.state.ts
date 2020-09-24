import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, catchError } from 'rxjs/operators';
import { asapScheduler, throwError } from 'rxjs';

export interface ButtonStates {
  activateDisabled: boolean;
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
    activateDisabled: true,
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
      buttonStates: {
        activateDisabled: selectedUser.active,
        deactivateDisabled: !selectedUser.active,
        addRoleDisabled: !selectedUser.active
      }
    });
  }

  @Action(UserActionTypes.ActivateDeactivateUser)
  activateDeactivateUser(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    const users = state.users.map(user => {
      if (user.key === state.selectedUsersId) {
        user.active = !user.active;
      }

      return user;
    });

    ctx.patchState({ users });
  }
}

