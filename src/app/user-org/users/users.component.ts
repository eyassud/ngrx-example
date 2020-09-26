import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';
import { Store, Select } from '@ngxs/store';
import * as UserActionTypes from './state/users.actions';
import { UsersSelectors } from './state/users.selectors';
import { OrganizationSelectors } from '../organizations/state/organizations.selectors';
import { ButtonStates } from './state/users.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  cols: any[];

  //#region Selectors
  @Select(UsersSelectors.getError)
  errorMessage$: Observable<string>;

  @Select(UsersSelectors.getLoading)
  loading$: Observable<boolean>;

  @Select(OrganizationSelectors.getSelectedOrganizationIds)
  selectedOrganizationIds$: Observable<number[]>;

  @Select(UsersSelectors.getUsers)
  users$: Observable<IUser[]>;

  @Select(UsersSelectors.getButtonStates)
  buttons$: Observable<ButtonStates>;

  @Select(UsersSelectors.getEditedUser)
  editedUser$: Observable<IUser>;
  //#endregion

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'lastName', header: 'Last' },
      { field: 'firstName', header: 'First' },
      { field: 'middleInitial', header: 'Middle' },
      { field: 'active', header: 'Active' }
    ];
  }

  //#region Event handlers
  onUserSelected(event) {
    this.store.dispatch(new UserActionTypes.UserSelected(event.data.key));
  }

  onActivateDeactivate() {
    this.store.dispatch(new UserActionTypes.ActivateDeactivateUser());
  }

  onEditUser() {
    this.store.dispatch(new UserActionTypes.EditUser());
  }

  onCancelEditUser() {
    this.store.dispatch(new UserActionTypes.CancelEditUser());
  }

  onUpdateEditUser(user: IUser) {
    this.store.dispatch(new UserActionTypes.UpdateUser(user));
  }
  //#endregion
}
