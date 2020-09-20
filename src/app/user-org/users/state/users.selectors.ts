import { Selector } from '@ngxs/store';
import { UsersState, UsersStateModel } from './users.state';

export class UsersSelectors {
  @Selector([UsersState])
  static getLoading(state: UsersStateModel){
    return state.loading;
  }

  @Selector([UsersState])
  static getError(state: UsersStateModel) {
    return state.error;
  }

  @Selector([UsersState])
  static getUsers(state: UsersStateModel) {
    return state.users;
  }

  @Selector([UsersState])
  static getSelectedUsersId(state: UsersStateModel) {
    return state.selectedUsersId;
  }
}
