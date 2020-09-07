import { TreeNode } from 'primeng/api';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { map, delay, mergeMap, tap, catchError } from 'rxjs/operators';
import * as OrganizationActionTypes from './organization.actions';
import { of, throwError } from 'rxjs';

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

  @Selector([ORGANIZATION_STATE_TOKEN])
  static error(state: OrganizationStateModel) {
    return state.error;
  }

  @Action(OrganizationActionTypes.Load)
  load(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.Load) {

    ctx.patchState({ loading: true });

    return this.organizationService.getOrganizations()
      .pipe(
        delay(200),
        tap(orgs =>
          ctx.patchState({ organizations: orgs, loading: false})
        ),
        catchError(err => {
          ctx.patchState({ loading: false, error: err });
          return throwError(err);
        }));
  }

   @Action(OrganizationActionTypes.OrgSelected)
  organizationSelected(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.OrgSelected) {
    ctx.patchState({
      selectedOrganizationIds: action.payload
    });
  }

  private findOrgById(organizations: TreeNode[], id: number): TreeNode {
    for (const organization of organizations) {
      if (organization.data.id === id) {
        return organization;
      }
      else if (organization.children) {
        this.findOrgById(organization.children, id);
      }
    }
  }
}
