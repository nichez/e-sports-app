import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsgoStreamsComponent } from './csgo-streams/csgo-streams.component';

const streamRoutes: Routes = [
  { path: '', component: CsgoStreamsComponent, children: [
    { path: '', component: CsgoStreamsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(streamRoutes)],
  exports: [RouterModule]
})
export class LiveStreamsRoutingModule { }
