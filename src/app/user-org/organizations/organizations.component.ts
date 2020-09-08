import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { map, filter, catchError, tap } from 'rxjs/operators';

import { Store, Select, Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { OrganizationStateModel, ORGANIZATION_STATE_TOKEN, OrganizationState } from './state/organization.state';
import * as OrganizationActionTypes from './state/organization.actions';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsComponent implements OnInit {
  organizations$: Observable<TreeNode[]>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  appName$: Observable<string>;
  selectedNode: TreeNode;

  @Select(ORGANIZATION_STATE_TOKEN) organizationState$: Observable<OrganizationStateModel>;

  constructor(
    private store: Store, private actions$: Actions
  ) { }

  ngOnInit(): void {
    this.loading$ = this.organizationState$.pipe(
      map(state => state.loading)
    );

    this.errorMessage$ = this.organizationState$.pipe(
      map(state => state.error)
    );

    this.organizations$ = this.organizationState$
      .pipe(
        map(state => state.organizations)
        // map(state => state.organizations),
        // filter((item) => !!item),
        // map((item) => this.buildTreeNode(item, []))
      );

    this.store.dispatch(new OrganizationActionTypes.Load());
  }

  onNodeSelect(event) {
    const ids = this.findAllOrgIds(event.node, []);
    this.store.dispatch(new OrganizationActionTypes.OrgSelected(ids));
  }

  onNodeExpand(event) {
    //this.store.dispatch(new OrganizationActionTypes.OrgExpanded(event.node.data.id));
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

  private buildTreeNode(organizations: TreeNode[], treeNodes: TreeNode[]): TreeNode[] {

    for (const organization of organizations) {
      treeNodes.push({
        data: { ...organization.data },
        expanded: organization.expanded,
        children: organization.children
          ? this.buildTreeNode(organization.children, [])
          : undefined,
      } as TreeNode);
    }

    return treeNodes;
  }
}
