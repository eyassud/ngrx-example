import { TreeNode } from 'primeng/api';
import { State, Action, StateContext, StateToken, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { map, delay, mergeMap, tap, catchError, filter } from 'rxjs/operators';
import * as OrganizationActionTypes from './organization.actions';
import { of, throwError } from 'rxjs';
import { patch } from '@ngxs/store/operators';

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
    ctx.patchState({ loading: true });

    return this.organizationService.getOrganizations()
      .pipe(
        delay(200),
        filter((item) => !!item),
        map(orgs => this.buildTreeNode(orgs, [])),
        tap(orgs => {
          ctx.patchState({ organizations: orgs, loading: false });
        }),
        catchError(err => {
          ctx.patchState({ organizations: [], loading: false, error: err });
          return throwError(err);
        }));
  }

  @Action(OrganizationActionTypes.OrgSelected)
  organizationSelected(ctx: StateContext<OrganizationStateModel>, action: OrganizationActionTypes.OrgSelected) {
    ctx.patchState({ selectedOrganizationIds: action.payload });
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

  private buildTreeNode(organizations: TreeNode[], treeNodes: TreeNode[]): TreeNode[] {

    for (const organization of organizations) {
      treeNodes.push({
        data: { ...organization.data },
        children: organization.children
          ? this.buildTreeNode(organization.children, [])
          : undefined,
      } as TreeNode);
    }

    return treeNodes;
  }
}
