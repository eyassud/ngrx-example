/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
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
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<UsersActions.Load>(UsersActions.UsersActionTypes.Load),
    mergeMap((action) =>
      this.usersService.getUsers(action.payload).pipe(
        delay(500),
        map((users) => new UsersActions.LoadSuccess(users)),
        catchError((err) => of(new UsersActions.LoadFail('Unable to load users')))
      )
    )
  );
}
