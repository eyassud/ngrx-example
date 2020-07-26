import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app.state';
import * as fromOrganizations from './organization.reducer';

export interface State extends fromRoot.State {
  organizations: fromOrganizations.OrganizationState;
}

const getOrganizationState = createFeatureSelector<
  fromOrganizations.OrganizationState
>('organizations');

export const getOrganization = createSelector(
  getOrganizationState,
  (state) => state.organizations
);

export const getError = createSelector(
  getOrganizationState,
  (state) => state.error
);

export const getLoading = createSelector(
  getOrganizationState,
  (state) => state.loading
);

export const getSelectedOrganizationIds = createSelector(
  getOrganizationState,
  (state) => state.selectedOrganizationIds
);

