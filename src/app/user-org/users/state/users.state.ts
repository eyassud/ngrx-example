import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, catchError } from 'rxjs/operators';
import { asapScheduler, throwError } from 'rxjs';
import { ErrorHandler } from 'src/app/shared/errorHandler';

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
    ctx.patchState({ selectedUsersId: action.payload });
  }
}

