import { TreeNode } from 'primeng/api';
import { State, Action, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { map, delay, catchError } from 'rxjs/operators';
import * as OrganizationActionTypes from './organization.actions';
import { throwError, asapScheduler } from 'rxjs';

export interface OrganizationStateModel {
  organizations: TreeNode;
  loading: boolean;
  selectedOrganizationIds: number[] | null;
  error: string;
}

const initialState: OrganizationStateModel = {
  organizations: null,
  loading: false,
  selectedOrganizationIds: null,
  error: '',
};

export const ORGANIZATION_STATE_TOKEN = new StateToken<OrganizationStateModel>('organizations');

@State<OrganizationStateModel>({
  name: ORGANIZATION_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class OrganizationState {
  constructor(private organizationService: OrganizationService) {
  }

  @Action(OrganizationActionTypes.Load)
  load(ctx: StateContext<OrganizationStateModel>) {
    ctx.patchState({ loading: true });

    return this.organizationService.getOrganizations()
      .pipe(
        map(orgs => {
          asapScheduler.schedule(() => ctx.dispatch(new OrganizationActionTypes.LoadSuccess(orgs)));
        }),
        catchError(() =>
          throwError(asapScheduler.schedule(() => ctx.dispatch(
            new OrganizationActionTypes.LoadFail('Failed to load organizations')))
        )));
  }

  @Action(OrganizationActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.LoadSuccess) {
    ctx.patchState({ loading: false, organizations: action.payload });
  }

  @Action(OrganizationActionTypes.LoadFail)
  loadFail(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.LoadFail) {
    ctx.patchState({ loading: false, organizations: null, error: action.payload });
  }

  @Action(OrganizationActionTypes.OrgSelected)
  organizationSelected(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.OrgSelected) {
    ctx.patchState({ selectedOrganizationIds: action.payload });
  }
}
