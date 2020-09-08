import * as UserActionTypes from './users.actions';
import { IUser } from '../../model/user.model';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { map, delay, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    ctx.patchState({ loading: true  });

    return this.usersService.getUsers(action.payload).pipe(
      delay(200),
      map(u => ctx.patchState({ users: u, loading: false})),
      catchError(err => {
        ctx.patchState({ loading: false, error: err});
        return throwError(err);
      })
    );
  }

  @Action(UserActionTypes.UserSelected)
  organizationSelected(ctx: StateContext<UsersStateModel>, action: UserActionTypes.UserSelected) {
    ctx.patchState({ selectedUsersId: action.payload });
  }
}

