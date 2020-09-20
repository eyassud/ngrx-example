import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IRole } from '../model/role.model';
import { UsersState, UsersStateModel, USERS_STATE_TOKEN } from '../users/state/users.state';
import * as RolesActionTypes from './state/roles.actions';
import { RolesState } from './state/roles.state';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  cols: any[];

  @Select(RolesState.error)
  errorMessage$: Observable<string>;

  @Select(RolesState.loading)
  loading$: Observable<boolean>;

  @Select(UsersState.selectedUserRoles)
  vm$: Observable<IRole[]>;

  @Select(USERS_STATE_TOKEN) usersState$: Observable<UsersStateModel>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'key', header: 'Id', hidden: false },
      { field: 'userId', header: 'UserId', hidden: true },
      { field: 'orgId', header: 'OrgId', hidden: false },
      { field: 'roleName', header: 'Role', hidden: true}
    ];

    this.usersState$.pipe(
      filter(state => Boolean(state.selectedUsersId)),
      map(state => this.store.dispatch(new RolesActionTypes.Load(state.selectedUsersId)))
    );
  }
}
