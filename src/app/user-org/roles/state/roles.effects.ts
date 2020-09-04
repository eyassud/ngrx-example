/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RolesActions from './roles.actions';
import { Injectable } from '@angular/core';
import { RolesService } from '../roles.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';

@Injectable()
export class RolesEffects {
  constructor(
    private rolesService: RolesService,
    private actions$: Actions
  ) {}

  @Effect()
  loadRoles$: Observable<Action> = this.actions$.pipe(
    ofType<RolesActions.Load>(RolesActions.RolesActionTypes.Load),
    mergeMap((action) =>
      this.rolesService.getRoles().pipe(
        delay(500),
        map((roles) => new RolesActions.LoadSuccess(roles)),
        catchError((err) => of(new RolesActions.LoadFail('Unable to load roles')))
      )
    )
  );
}
