import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app.state';
import * as fromRoles from './roles.reducer';

export interface State extends fromRoot.State {
  Roles: fromRoles.RolesState;
}

const getRolesState = createFeatureSelector<fromRoles.RolesState>('roles');

export const getRoles = createSelector(
  getRolesState,
  (state) => state.roles
);

export const getError = createSelector(
  getRolesState,
  (state) => state.error
);


