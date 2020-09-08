import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IUser } from '../model/user.model';
import { Store, Select } from '@ngxs/store';
import { UsersStateModel, USER_STATE_TOKEN } from './state/users.state';
import * as UserActionTypes from './state/users.actions';
import { map, filter } from 'rxjs/operators';
import { OrganizationStateModel, ORGANIZATION_STATE_TOKEN } from '../organizations/state/organization.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  cols: any[];
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showGrid$: Observable<boolean>;
  vm$: Observable<IUser[]>;
  selectedUser: any;

  @Select(USER_STATE_TOKEN) usersState$: Observable<UsersStateModel>;
  @Select(ORGANIZATION_STATE_TOKEN) organizationState$: Observable<OrganizationStateModel>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'lastName', header: 'Last' },
      { field: 'firstName', header: 'First' },
      { field: 'middleInitial', header: 'Middle' },
      { field: 'active', header: 'Active' }
    ];

    this.loading$ = this.usersState$.pipe(
      map(state => state.loading)
    );

    this.errorMessage$ = this.usersState$.pipe(
      map(state => state.error)
    );

    const orgId$ = this.organizationState$.pipe(
      map(state => state.selectedOrganizationIds),
      filter(ids => ids !== null),
      map((ids: number[]) => this.store.dispatch(new UserActionTypes.Load(ids))));

    const users$ = this.usersState$.pipe(
      map(state => state.users),
      filter((item) => !!item),
      map((users) => users)
    );

    this.vm$ = combineLatest([orgId$, users$])
      .pipe(
        map(([_, users]) => [...users])
      );
  }

  onRowSelect(event) {
    //this.userStore.dispatch(new userActions.UserSelected(event.data.id));
  }
}
