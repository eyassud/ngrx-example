import { createSelector, Selector } from '@ngxs/store';
import { UsersState, UsersStateModel } from './users.state';

export class UsersSelectors {
  @Selector([UsersState])
  static getLoading(state: UsersStateModel[], sourceNumber: string) {
    return state.find(s => s.sourceNumber === sourceNumber).loading;
  }

  static getLoading2(sourceNumber: string) {
    return createSelector([UsersState], (state: UsersStateModel[]) =>
    {
      return state.find(s => s.sourceNumber === sourceNumber).loading;
    });
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

  @Selector([UsersState])
  static getButtonStates(state: UsersStateModel) {
    return state.buttonStates;
  }

  @Selector([UsersState])
  static getEditedUser(state: UsersStateModel) {
    return state.editUser;
  }
}
