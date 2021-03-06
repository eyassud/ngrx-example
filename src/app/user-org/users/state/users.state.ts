import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, catchError } from 'rxjs/operators';
import { asapScheduler, throwError } from 'rxjs';
import { patch } from '@ngxs/store/operators';

export interface ButtonStates {
  activateDisabled: boolean;
  deactivateDisabled: boolean;
  addRoleDisabled: boolean;
  editUserDisabled: boolean;
}
export interface UsersStateModel {
  sourceNumber: string;
  users: IUser[];
  editUser: IUser;
  selectedUsersId: number | null;
  loading: boolean;
  error: string;
  buttonStates: ButtonStates;
}

const dummy: UsersStateModel =
{
  sourceNumber: '',
  users: [],
  editUser: null,
  selectedUsersId: null,
  loading: false,
  error: '',
  buttonStates: {
    activateDisabled: true,
    deactivateDisabled: true,
    addRoleDisabled: true,
    editUserDisabled: true
  }
};

const initialState: UsersStateModel[] = [];

export const USERS_STATE_TOKEN = new StateToken<UsersStateModel>('users');

@State<UsersStateModel[]>({
  name: USERS_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) { }

  @Action(UserActionTypes.Load)
  load(ctx: StateContext<UsersStateModel[]>, action: UserActionTypes.Load) {
    const state = ctx.getState();
    const sources = state.map(source => {
      if (source.sourceNumber === action.sourceNumber) {
        source.loading = true;
        source.sourceNumber = action.sourceNumber;
        return source;
      } else {
        return source;
      }
    });

    ctx.setState(
      sources
    );

    return this.usersService.getUsers(action.payload)
      .pipe(
        map(users => asapScheduler.schedule(() =>
          ctx.dispatch(new UserActionTypes.LoadSuccess(users, action.sourceNumber)))),
        catchError(() =>
          throwError(asapScheduler.schedule(
            () => ctx.dispatch(new UserActionTypes.LoadFail('Loading users failed')))
          )));
  }

  @Action(UserActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<UsersStateModel[]>, action: UserActionTypes.LoadSuccess) {
    const state = ctx.getState();
    // const sources = state.map(source => {
    //   if (source.sourceNumber === action.sourceNumber) {
    //     source.loading = true;
    //     source.sourceNumber = action.sourceNumber;
    //     return source;
    //   } else {
    //     return source;
    //   }
    // });
    const result = { sourceNumber: action.sourceNumber, users: action.payload };

    ctx.setState([ ...state, { ...dummy, ...result }]);
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
        addRoleDisabled: !selectedUser.active,
        editUserDisabled: !selectedUser.active
      }
    });
  }

  @Action(UserActionTypes.ActivateDeactivateUser)
  activateDeactivateUser(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    let selectedUser: IUser = null;

    const users = state.users.map(user => {
      if (user.key === state.selectedUsersId) {
        selectedUser = { ...user };
        selectedUser.active = !user.active;
        return selectedUser;
      } else {
        return user;
      }
    });

    const buttonStates: ButtonStates = {
      activateDisabled: selectedUser.active,
      deactivateDisabled: !selectedUser.active,
      addRoleDisabled: !selectedUser.active,
      editUserDisabled: !selectedUser.active
    };

    ctx.patchState({ users, buttonStates });
  }

  @Action(UserActionTypes.EditUser)
  editUser(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();

    ctx.patchState({ editUser: state.users.find(user => user.key === state.selectedUsersId) });
  }

  @Action(UserActionTypes.CancelEditUser)
  cancelEditUser(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();

    ctx.patchState({ editUser: null });
  }

  @Action(UserActionTypes.UpdateUser)
  updateUser(ctx: StateContext<UsersStateModel>, payload: UserActionTypes.UpdateUser) {
    const state = ctx.getState();
    const users = state.users.map(u => {
      if (u.key === payload.user.key) {
        return payload.user;
      }
      else {
        return u;
      }
    });

    ctx.patchState({ users, editUser: null });
  }
}

