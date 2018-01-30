import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from '../auth/auth-guard.service';

import { Dota2Component } from './dota2.component';
import { Dota2StartComponent } from './dota2-start/dota2-start.component';
import { Dota2EditComponent } from './dota2-edit/dota2-edit.component';
import { Dota2DetailComponent } from './dota2-detail/dota2-detail.component';

const dota2Routes: Routes = [
  { path: '', component: Dota2Component, children: [
    { path: '', component: Dota2StartComponent },
    { path: 'new', component: Dota2EditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: Dota2DetailComponent },
    { path: ':id/edit', component: Dota2EditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(dota2Routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class Dota2RoutingModule {}
