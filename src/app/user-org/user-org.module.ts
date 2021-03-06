import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { SourcesComponent } from './sources/sources.component';
import { RolesComponent } from './roles/roles.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationState } from './organizations/state/organization.state';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './users/state/users.state';

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
    ReactiveFormsModule,
    TreeTableModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    NgxsModule.forFeature([OrganizationState, UsersState])
  ],
  exports: [
    SourcesComponent,
    OrganizationsComponent,
    RolesComponent,
    UsersComponent
  ],
})
export class UserOrgModule { }
