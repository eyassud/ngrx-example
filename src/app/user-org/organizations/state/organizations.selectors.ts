import { Selector } from '@ngxs/store';
import { OrganizationState, OrganizationStateModel } from './organization.state';

export class  OrganizationSelectors
{
  @Selector([OrganizationState])
  static getLoading(state: OrganizationStateModel) {
    return state.loading;
  }

  @Selector([OrganizationState])
  static getError(state: OrganizationStateModel) {
    return state.error;
  }

  @Selector([OrganizationState])
  static getOrganizations(state: OrganizationStateModel) {
    return state.organizations;
  }

  @Selector([OrganizationState])
  static getSelectedOrganizationIds(state: OrganizationStateModel){
    return state.selectedOrganizationIds;
  }
}
