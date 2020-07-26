import { RolesActionTypes, RolesActions } from './roles.actions';
import { IUser } from '../model/userModel';

export interface RolesState {
  selectedUser: number | null;
  loading: boolean;
  error: string;
}

const initialState: RolesState = {
  selectedUser: null,
  loading: false,
  error: '',
};

export function reducerUsers(
  state = initialState,
  action: RolesActions
): RolesState {
  switch (action.type) {
    case RolesActionTypes.Load:
      return {
        ...state,
        loading: true
      };

    case RolesActionTypes.LoadSuccess:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case RolesActionTypes.LoadFail:
      return {
        ...state,
        selectedUser: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
