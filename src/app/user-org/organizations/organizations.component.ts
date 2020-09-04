import { Component, OnInit } from '@angular/core';

import * as fromOrganization from './state';
import * as organizationActions from './state/organization.actions';
import * as fromUsers from '../users/state';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { TreeNode } from 'primeng/api';
import { map, filter, tap } from 'rxjs/operators';


import { Store as nStore, Select } from '@ngxs/store';
import { OrganizationActions } from './state/organization.actions';

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

  constructor(
    private organizationStore: Store<fromOrganization.State>,
    private store: nStore
  ) { }

  ngOnInit(): void {
    // this.organizationStore.dispatch(new organizationActions.Load());

    // this.organizations$ = this.organizationStore.pipe(
    //   select(fromOrganization.getOrganization),
    //   filter((item) => !!item),
    //   map((item) => this.recursive(item, []))
    // );

    // this.errorMessage$ = this.organizationStore.pipe(
    //   select(fromOrganization.getError)
    // );

    // this.loading$ = this.organizationStore
    //   .pipe(select(fromOrganization.getLoading));

    const x = this.store.select([ORGANIZATION_STATE_TOKEN]);

    this.loading$ = this.store.select(state => state.Organization.loading);
    this.errorMessage$ = this.store.select(state => state.Organization.error);
    this.organizations$ = this.store.select(state => state.Organization.organizations)
      .pipe(
        tap(orgs => console.log(JSON.stringify(orgs))),
        filter((item) => !!item),
        map((item) => this.recursive(item, []))
      );

    this.store.dispatch(new OrganizationActions.nLoad());
  }

  onNodeSelect(event) {
    const ids = [];
    this.findAllOrgIds(event.node, ids);
    this.organizationStore.dispatch(new organizationActions.OrgSelected(ids));
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

  private recursive(organizations: any[], treeNodes: TreeNode[]): TreeNode[] {
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
