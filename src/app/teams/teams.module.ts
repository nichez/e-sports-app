import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TeamsComponent } from './teams.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamStartComponent } from './team-start/team-start.component';
import { TeamItemComponent } from './team-list/team-item/team-item.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TeamStreamsComponent } from './team-streams/team-streams.component';

@NgModule({
  declarations: [
    TeamsComponent,
    TeamStartComponent,
    TeamListComponent,
    TeamEditComponent,
    TeamDetailComponent,
    TeamItemComponent,
    TeamStreamsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule {}
