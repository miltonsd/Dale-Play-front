import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import { UsersListComponent } from '../users/components/users-list/users-list.component';

const modules = [ComponentsModule, MaterialModule];
@NgModule({
  declarations: [AdminComponent, UsersListComponent],
  imports: [CommonModule, AdminRoutingModule, ...modules],
})
export class AdminModule {}
