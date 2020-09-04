import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppActions } from './app.actions';


export interface State {
  name: string;
}

export interface AppStateModel {
  name: string;
}

@State<AppStateModel>({
  name: 'App',
  defaults: {
    name: ''
  }
})
@Injectable()
export class AppState {

  @Selector()
  static getAppName(state: AppStateModel): string{
    return state.name;
  }

  @Action(AppActions.SetName)
  setName(ctx: StateContext<AppStateModel>, action: AppActions.SetName) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      name: action.name
    });
  }
}


