import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthService } from '../auth/services/auth/auth.service';

@NgModule({
  declarations: [UsersComponent, ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
  providers: [AuthService],
})
export class UsersModule {}
