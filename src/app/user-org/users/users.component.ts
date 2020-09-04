import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IUser } from '../model/user.model';
import * as fromUsers from './state';
import * as userActions from './state/users.actions';
import * as fromOrganizations from '../organizations/state';
//import { Store, select } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  cols: any[];
  cols1: any[];
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showGrid$: Observable<boolean>;
  vm$: Observable<IUser[]>;
  selectedUser: any;

  constructor(
    // private userStore: Store<fromUsers.State>,
    // private organizationStore: Store<fromOrganizations.State>,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'lastName', header: 'Last' },
      { field: 'firstName', header: 'First' },
      { field: 'middleInitial', header: 'Middle' },
      { field: 'active', header: 'Active' }
    ];

    // const orgId$ = this.organizationStore.pipe(
    //   select(fromOrganizations.getSelectedOrganizationIds),
    //   filter(ids => ids !== null),
    //   map(ids => this.userStore.dispatch(new userActions.Load(ids))));

    // const users$ = this.userStore.pipe(
    //   select(fromUsers.getUsers),
    //   filter((item) => !!item),
    //   map((users) => users)
    // );

    // this.vm$ = combineLatest([orgId$, users$])
    //   .pipe(
    //     map(([orgId, users]) => [...users])
    //   );

    // this.errorMessage$ = this.userStore.pipe(select(fromUsers.getError));

    // this.loading$ = this.userStore.pipe(select(fromUsers.getLoading));

  }

  onRowSelect(event) {
    //this.userStore.dispatch(new userActions.UserSelected(event.data.id));
  }
}
