import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, User } from '../model/user.model';
import { Store, Select } from '@ngxs/store';
import * as UserActionTypes from './state/users.actions';
import { UsersSelectors } from './state/users.selectors';
import { OrganizationSelectors } from '../organizations/state/organizations.selectors';
import { ButtonStates, USERS_STATE_TOKEN } from './state/users.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';

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

  editedUser$: Observable<IUser>;
  //#endregion

  userForm: FormGroup;
  user: IUser = new User();

  constructor(private store: Store, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'lastName', header: 'Last' },
      { field: 'firstName', header: 'First' },
      { field: 'middleInitial', header: 'Middle' },
      { field: 'active', header: 'Active' }
    ];

    this.userForm = this.fb.group({
      key: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleInitial: ['', Validators.required],
      active: ''
    });

    this.editedUser$ = this.store.select(UsersSelectors.getEditedUser)
      .pipe(
        map(user => {
          if (user) {
            this.userForm.patchValue(user);
          }

          return user;
        })
      );
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

  onUpdateEditUser() {
    this.store.dispatch(new UserActionTypes.UpdateUser(this.userForm.value));
  }
  //#endregion
}
