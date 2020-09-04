import { TreeNode } from 'primeng/api';
import {
  OrganizationActionTypes,
  OrganizationActions,
} from './organization.actions';
import { State, Action, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { map, catchError, tap, mergeMap, delay } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

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

// export function reducerOrganization(
//   state = initialState,
//   action: OrganizationActions
// ): OrganizationState {
//   switch (action.type) {
//     case OrganizationActionTypes.Load:
//       return {
//         ...state,
//         loading: true,
//       };

//     case OrganizationActionTypes.LoadSuccess:
//       return {
//         ...state,
//         organizations: action.payload,
//         loading: false,
//         error: '',
//       };

//     case OrganizationActionTypes.LoadFail:
//       return {
//         ...state,
//         organizations: null,
//         loading: false,
//         error: action.payload,
//       };

//     case OrganizationActionTypes.OrgSelected:
//       return {
//         ...state,
//         selectedOrganizationIds: action.payload
//       };

//     default:
//       return state;
//   }
// }

const ORGANIZATION_STATE_TOKEN = new StateToken<OrganizationStateModel>('organizations');
@State<OrganizationStateModel>({
  name: ORGANIZATION_STATE_TOKEN,
  defaults: initialState
})
@Injectable()
export class OrganizationState {
  constructor(private organizationService: OrganizationService) { }

  @Action(OrganizationActions.nLoad)
  load(ctx: StateContext<OrganizationStateModel>, action: OrganizationActions.nLoad) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: true
    });
    return this.organizationService.getOrganizations()
      .pipe(
        mergeMap(orgs => ctx.dispatch(new OrganizationActions.nLoadSuccess(orgs))),
        catchError((err: ErrorEvent) => ctx.dispatch(new OrganizationActions.nLoadFail('Failed to load organizations')))
      );
  }

  @Action(OrganizationActions.nLoadSuccess)
  loadSuccess(ctx: StateContext<OrganizationStateModel>, action: OrganizationActions.nLoadSuccess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      organizations: action.payload,
      loading: false,
      error: '',
    });
  }

  @Action(OrganizationActions.nLoadFail)
  loadFail(ctx: StateContext<OrganizationStateModel>, action: OrganizationActions.nLoadFail) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      loading: false,
      error: action.payload,
    });
  }

  @Action(OrganizationActions.nOrgSelected)
  organizationSelected(ctx: StateContext<OrganizationStateModel>, action: OrganizationActions.nOrgSelected) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedOrganizationIds: action.payload
    });
  }
}
