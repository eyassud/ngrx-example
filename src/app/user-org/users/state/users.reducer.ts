import { UsersActionTypes, UsersActions } from './users.actions';
import { IUser } from '../model/userModel';

export interface UsersState {
  users: IUser[];
  selectedUsersId: number | null;
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: null,
  selectedUsersId: null,
  loading: false,
  error: '',
};

export function reducerUsers(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case UsersActionTypes.Load:
      return {
        ...state,
        loading: true
      };

    case UsersActionTypes.LoadSuccess:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };

    case UsersActionTypes.LoadFail:
      return {
        ...state,
        users: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
