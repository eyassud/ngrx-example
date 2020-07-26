import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app.state';
import * as fromUsers from './Users.reducer';

export interface State extends fromRoot.State {
  Users: fromUsers.UsersState;
}

const getUsersState = createFeatureSelector<fromUsers.UsersState>('users');

export const getUsers = createSelector(
  getUsersState,
  (state) => state.users
);

export const getError = createSelector(
  getUsersState,
  (state) => state.error
);

export const getLoading = createSelector(
  getUsersState,
  (state) => state.loading
);


