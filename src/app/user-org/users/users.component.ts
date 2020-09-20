import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';
import { Store, Select } from '@ngxs/store';
import * as UserActionTypes from './state/users.actions';
import { UsersSelectors } from './state/users.selectors';
import { OrganizationSelectors } from '../organizations/state/organizations.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  cols: any[];

  @Select(UsersSelectors.getError)
  errorMessage$: Observable<string>;

  @Select(UsersSelectors.getLoading)
  loading$: Observable<boolean>;

  @Select(OrganizationSelectors.getSelectedOrganizationIds)
  selectedOrganizationIds$: Observable<number[]>;

  @Select(UsersSelectors.getUsers)
  users$: Observable<IUser[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'lastName', header: 'Last' },
      { field: 'firstName', header: 'First' },
      { field: 'middleInitial', header: 'Middle' },
      { field: 'active', header: 'Active' }
    ];
  }

  onRowSelect(event) {
    this.store.dispatch(new UserActionTypes.UserSelected(event.data.key));
  }

  date() {
    return Date.now();
  }
}
