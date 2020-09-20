import { AppStateModel } from './app.state';

export class LoggedIn {
  static readonly type = '[App] LoggedIn';

  constructor(public title: string, public loggedIn: boolean) { }
}
