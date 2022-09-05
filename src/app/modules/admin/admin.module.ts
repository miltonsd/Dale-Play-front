import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { UsersCreateComponent } from '../users/components/users-create/users-create.component';
import { UsersUpdateComponent } from '../users/components/users-update/users-update.component';

const modules = [ComponentsModule, MaterialModule];
@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersUpdateComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, ...modules],
})
export class AdminModule {}
