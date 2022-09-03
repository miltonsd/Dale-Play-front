import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, ComponentsModule, MaterialModule],
})
export class UsersModule {}
