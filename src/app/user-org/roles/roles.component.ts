import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../users/state';
import * as fromRoles from './state';
import { map, filter } from 'rxjs/operators';
import { IRole } from '../model/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  cols: any[];
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  vm$: Observable<IRole[]>;

  constructor(private userStore: Store<fromUsers.State>, private rolesStore: Store<fromRoles.State>) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'roleId', header: 'RoleId' },
      { field: 'orgId', header: 'OrgId' }
    ];

    this.vm$ = this.userStore.pipe(
      select(fromUsers.getSelectedUser),
      filter(user => Boolean(user)),
      map((user) => user.roles)
    );
  }
}
