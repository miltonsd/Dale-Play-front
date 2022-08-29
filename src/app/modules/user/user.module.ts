import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, ComponentsModule, MaterialModule],
})
export class UserModule {}
