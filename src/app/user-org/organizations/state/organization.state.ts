import { TreeNode } from 'primeng/api';
import { State, Action, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { map, delay } from 'rxjs/operators';
import * as OrganizationActionTypes from './organization.actions';

export interface OrganizationStateModel {
  organizations: TreeNode[];
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
  load(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.Load) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: true
    });

    return this.organizationService.getOrganizations()
      .pipe(
        delay(200),
        map(orgs => ctx.dispatch(new OrganizationActionTypes.LoadSuccess(orgs)))
      );
  }

  @Action(OrganizationActionTypes.LoadSuccess)
  loadSuccess(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.LoadSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      organizations: action.payload,
      loading: false,
      error: '',
    });
  }

  @Action(OrganizationActionTypes.LoadFail)
  loadFail(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.LoadFail) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: false,
      error: action.payload,
    });
  }

  @Action(OrganizationActionTypes.OrgSelected)
  organizationSelected(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.OrgSelected) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedOrganizationIds: action.payload
    });
  }
}
