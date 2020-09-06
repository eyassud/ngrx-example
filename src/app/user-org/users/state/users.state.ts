import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, delay } from 'rxjs/operators';

export interface UsersStateModel {
  users: IUser[];
  selectedUsersId: number | null;
  loading: boolean;
  error: string;
}

const initialState: UsersStateModel = {
  users: [],
  selectedUsersId: null,
  loading: false,
  error: '',
};

export const USER_STATE_TOKEN = new StateToken<UsersStateModel>('users');

@State<UsersStateModel>({
  name: USER_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class UsersState {
  constructor(private usersService: UsersService) {
  }

  @Action(UserActionTypes.Load)
  load(ctx: StateContext<UsersStateModel>, action: UserActionTypes.Load) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: true
    });

    return this.usersService.getUsers(action.payload).pipe(
      delay(200),
      map((users) => ctx.dispatch(new UserActionTypes.LoadSuccess(users)))
    );
  }

  @Action(UserActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<UsersStateModel>, action: UserActionTypes.LoadSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      users: action.payload,
      loading: false,
      error: '',
    });
  }

  @Action(UserActionTypes.LoadFail)
  loadFail(ctx: StateContext<UsersStateModel>, action: UserActionTypes.LoadFail) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: false,
      error: action.payload,
    });
  }

  @Action(UserActionTypes.UserSelected)
  organizationSelected(ctx: StateContext<UsersStateModel>, action: UserActionTypes.UserSelected) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedUsersId: action.payload
    });
  }
}

