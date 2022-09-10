import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Servicios
import { AuthService } from '@dlp/auth/services';
// Views
import { ProfileComponent } from '@dlp/users/views';

const modules = [ReactiveFormsModule, ComponentsModule, MaterialModule];
const views = [ProfileComponent];
@NgModule({
  declarations: [UsersComponent, ...views],
  imports: [CommonModule, UsersRoutingModule, ...modules],
  providers: [AuthService],
})
export class UsersModule {}
