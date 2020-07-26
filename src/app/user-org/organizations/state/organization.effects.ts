/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as organizationActions from './organization.actions';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';

@Injectable()
export class OrganizationEffects {
  constructor(
    private organizationService: OrganizationService,
    private actions$: Actions
  ) {}

  @Effect()
  loadOrganizations$: Observable<Action> = this.actions$.pipe(
    ofType(organizationActions.OrganizationActionTypes.Load),
    delay(1000), // to simulate network delay
    mergeMap((action) =>
      this.organizationService.getOrganizations().pipe(
        map((organizations) => new organizationActions.LoadSuccess(organizations)),
        catchError((err) => of(new organizationActions.LoadFail(err)))
      )
    )
  );
}
