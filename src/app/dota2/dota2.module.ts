import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Dota2Component } from './dota2.component';
import { Dota2EditComponent } from './dota2-edit/dota2-edit.component';
import { Dota2StartComponent } from './dota2-start/dota2-start.component';
import { Dota2ItemComponent } from './dota2-list/dota2-item/dota2-item.component';
import { Dota2DetailComponent } from './dota2-detail/dota2-detail.component';
import { Dota2ListComponent } from './dota2-list/dota2-list.component';
import { Dota2RoutingModule } from './dota2-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    Dota2Component,
    Dota2StartComponent,
    Dota2ListComponent,
    Dota2EditComponent,
    Dota2DetailComponent,
    Dota2ItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Dota2RoutingModule,
    SharedModule
  ]
})
export class Dota2Module {}
