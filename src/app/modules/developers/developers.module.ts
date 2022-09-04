import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';


@NgModule({
  declarations: [
    DevelopersComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule
  ]
})
export class DevelopersModule { }
