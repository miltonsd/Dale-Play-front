import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersCreateComponent } from './components/users-create/users-create.component';
import { UsersUpdateComponent } from './components/users-update/users-update.component';

@NgModule({
  declarations: [UsersComponent, ProfileComponent, UsersCreateComponent, UsersUpdateComponent],
  imports: [CommonModule, UsersRoutingModule, ComponentsModule, MaterialModule],
})
export class UsersModule {}
