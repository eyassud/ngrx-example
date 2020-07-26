import { Component, OnInit } from '@angular/core';

import * as fromOrganization from './state';
import * as organizationActions from './state/organization.actions';
import * as fromUsers from '../users/state';
import * as userActions from '../users/state/users.actions';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { TreeNode } from 'primeng/api';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {
  organizations$: Observable<TreeNode[]>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(
    private organizationStore: Store<fromOrganization.State>,
    private usersStore: Store<fromUsers.State>
  ) { }

  ngOnInit(): void {
    this.organizationStore.dispatch(new organizationActions.Load());

    this.organizations$ = this.organizationStore.pipe(
      select(fromOrganization.getOrganization),
      filter((item) => !!item),
      map((item) => this.recursive(item, []))
    );

    this.errorMessage$ = this.organizationStore.pipe(
      select(fromOrganization.getError)
    );

    this.loading$ = this.organizationStore
      .pipe(select(fromOrganization.getLoading));
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
