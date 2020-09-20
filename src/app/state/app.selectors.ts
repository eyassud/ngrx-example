import { Selector } from '@ngxs/store';
import { AppState, AppStateModel } from './app.state';

export class AppSelectors {
  @Selector([AppState])
  static getLoggedIn(state: AppStateModel) {
    return state.loggedIn;
  }

  @Selector([AppState])
  static getTitle(state: AppStateModel) {
    return state.title;
  }
}
