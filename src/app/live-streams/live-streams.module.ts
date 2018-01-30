import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveStreamsRoutingModule } from './live-streams-routing.module';
import { CsgoStreamsComponent } from './csgo-streams/csgo-streams.component';

@NgModule({
  imports: [
    CommonModule,
    LiveStreamsRoutingModule
  ],
  declarations: [
    CsgoStreamsComponent
    ]
})
export class LiveStreamsModule { }
