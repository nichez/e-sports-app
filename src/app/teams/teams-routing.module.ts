import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from '../auth/auth-guard.service';

import { TeamsComponent } from './teams.component';
import { TeamStartComponent } from './team-start/team-start.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamStreamsComponent } from './team-streams/team-streams.component';

const teamsRoutes: Routes = [
  { path: '', component: TeamsComponent, children: [
    { path: '', component: TeamStartComponent },
    { path: 'new', component: TeamEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: TeamDetailComponent },
    { path: ':id/edit', component: TeamEditComponent, canActivate: [AuthGuard] },
    { path: 'csgo', component: TeamStreamsComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(teamsRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TeamsRoutingModule {}
