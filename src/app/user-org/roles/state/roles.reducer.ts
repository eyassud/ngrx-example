import { RolesActionTypes, RolesActions } from './roles.actions';
import { IRole } from '../../model/role.model';

export interface RolesState {
  roles: IRole[];
  loading: boolean;
  error: string;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: '',
};

export function reducerRoles(
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
        roles: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
