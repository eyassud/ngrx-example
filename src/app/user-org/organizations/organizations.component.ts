import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';

import { Store, Select } from '@ngxs/store';
import * as OrganizationActionTypes from './state/organization.actions';
import { OrganizationSelectors } from './state/organizations.selectors';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsComponent implements OnInit {
  @Select(OrganizationSelectors.getOrganizations)
  organizations$: Observable<TreeNode[]>;

  @Select(OrganizationSelectors.getError)
  errorMessage$: Observable<string>;

  @Select(OrganizationSelectors.getHasError)
  hasError$: Observable<boolean>;

  @Select(OrganizationSelectors.getLoading)
  loading$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new OrganizationActionTypes.Load());
  }

  onOrganizationSelected(event) {
    const keys = this.findAllOrgKeys(event.node, []);
    this.store.dispatch(new OrganizationActionTypes.OrgSelected(keys));
  }

  private findAllOrgKeys(node: TreeNode, keys: number[]) {
    keys.push(node.data.key);

    if (node.children) {
      for (const child of node.children) {
        this.findAllOrgKeys(child, keys);
      }
    }

    return keys;
  }
}
