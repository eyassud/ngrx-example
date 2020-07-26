import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SourcesComponent } from './sources/sources.component';
import { RolesComponent } from './roles/roles.component';
import { reducerOrganization } from './organizations/state/organization.reducer';
import { OrganizationsComponent } from './organizations/organizations.component';
import { StoreModule } from '@ngrx/store';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { EffectsModule } from '@ngrx/effects';
import { OrganizationEffects } from './organizations/state/organization.effects';
import { FormsModule } from '@angular/forms';
import { UsersEffects } from './users/state/users.effects';
import { reducerUsers } from './users/state/Users.reducer';

@NgModule({
  declarations: [
    UsersComponent,
    SourcesComponent,
    RolesComponent,
    OrganizationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeTableModule, TableModule,
    StoreModule.forFeature('organizations', reducerOrganization),
    StoreModule.forFeature('users', reducerUsers),
    EffectsModule.forFeature([OrganizationEffects, UsersEffects]),
  ],
  exports: [
    SourcesComponent,
    OrganizationsComponent,
    RolesComponent,
    UsersComponent
  ],
})
export class UserOrgModule {}
