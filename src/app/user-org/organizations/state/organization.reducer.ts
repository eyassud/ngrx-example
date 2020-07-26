import { TreeNode } from 'primeng/api';
import {
  OrganizationActionTypes,
  OrganizationActions,
} from './organization.actions';

export interface OrganizationState {
  organizations: TreeNode[];
  loading: boolean;
  selectedOrganizationIds: number[] | null;
  error: string;
}

const initialState: OrganizationState = {
  organizations: null,
  loading: false,
  selectedOrganizationIds: null,
  error: '',
};

export function reducerOrganization(
  state = initialState,
  action: OrganizationActions
): OrganizationState {
  switch (action.type) {
    case OrganizationActionTypes.Load:
      return {
        ...state,
        loading: true,
      };

    case OrganizationActionTypes.LoadSuccess:
      return {
        ...state,
        organizations: action.payload,
        loading: false,
        error: '',
      };

    case OrganizationActionTypes.LoadFail:
      return {
        ...state,
        organizations: null,
        loading: false,
        error: action.payload,
      };

      case OrganizationActionTypes.OrgSelected:
        return {
          ...state,
          selectedOrganizationIds: action.payload
        };

    default:
      return state;
  }
}
