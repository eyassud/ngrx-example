import { Selector } from '@ngxs/store';
import { OrganizationState, OrganizationStateModel } from './organization.state';

export class  OrganizationSelectors
{
  @Selector([OrganizationState])
  static loading(state: OrganizationStateModel) {
    return state.loading;
  }

  @Selector([OrganizationState])
  static error(state: OrganizationStateModel) {
    return state.error;
  }

  @Selector([OrganizationState])
  static organizations(state: OrganizationStateModel) {
    return state.organizations;
  }
}
