/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RolesActions from './roles.actions';
import { Injectable } from '@angular/core';
import { UsersService } from '../Users.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';

@Injectable()
export class UsersEffects {
  constructor(
    private usersService: UsersService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRoles$: Observable<Action> = this.actions$.pipe(
    ofType<RolesActions.Load>(RolesActions.RolesActionTypes.Load),
    mergeMap((action) =>
      this.usersService.getUsers(action.payload).pipe(
        delay(500),
        map((users) => new RolesActions.LoadSuccess(users)),
        catchError((err) => of(new RolesActions.LoadFail('Unable to load users')))
      )
    )
  );
}
