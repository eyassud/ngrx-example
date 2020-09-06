import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { map, filter, catchError } from 'rxjs/operators';

import { Store, Select } from '@ngxs/store';
import { OrganizationStateModel, ORGANIZATION_STATE_TOKEN, OrganizationState } from './state/organization.state';
import * as OrganizationActionTypes from './state/organization.actions';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {
  organizations$: Observable<TreeNode[]>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  appName$: Observable<string>;

  @Select(ORGANIZATION_STATE_TOKEN) state$: Observable<OrganizationStateModel>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading$ = this.state$.pipe(
      map(state => state.loading)
    );

    this.errorMessage$ = this.state$.pipe(
      map(state => state.error)
    );

    this.organizations$ = this.state$
      .pipe(
        map(state => state.organizations),
        filter((item) => !!item),
        map((item) => this.recursive(item, []))
      );

    this.store.dispatch(new OrganizationActionTypes.Load())
      .pipe(
        map(orgs => this.store.dispatch(new OrganizationActionTypes.LoadSuccess(orgs)))//,
        // catchError(() => this.store.dispatch(
        //   new OrganizationActionTypes.LoadFail('Failed to load organizations')))
      );//.subscribe();
  }

  onNodeSelect(event) {
    const ids = [];
    this.findAllOrgIds(event.node, ids);
    this.store.dispatch(new OrganizationActionTypes.OrgSelected(ids));
  }

  private findAllOrgIds(node: TreeNode, ids: number[]) {
    ids.push(node.data.id);

    if (node.children) {
      for (const child of node.children) {
        this.findAllOrgIds(child, ids);
      }
    }

    return ids;
  }

  private recursive(organizations: TreeNode[], treeNodes: TreeNode[]): TreeNode[] {

    for (const organization of organizations) {
      treeNodes.push({
        data: { ...organization.data },
        children: organization.children
          ? this.recursive(organization.children, [])
          : undefined,
      } as TreeNode);
    }

    return treeNodes;
  }
}
