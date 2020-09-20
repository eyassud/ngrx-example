import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as AppActionTypes from './app.actions';

export interface AppStateModel {
  title: string;
  loggedIn: boolean;
}

@State<AppStateModel>({
  name: 'App',
  defaults: {
    title: '',
    loggedIn: false
  }
})
@Injectable()
export class AppState {

  @Action(AppActionTypes.LoggedIn)
  setLoggedIn(ctx: StateContext<AppStateModel>, payload: AppActionTypes.LoggedIn) {
    ctx.patchState({
      title : payload.title,
      loggedIn: payload.loggedIn
    });
  }
}


