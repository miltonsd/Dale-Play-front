import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Views
import {
  ContactListComponent,
  GamesListComponent,
  GamesUpdateComponent,
  GamesCreateComponent,
  UsersListComponent,
  UsersCreateComponent,
  UsersUpdateComponent,
} from '@dlp/admin/views';

const modules = [ReactiveFormsModule, ComponentsModule, MaterialModule];
const views = [
  ContactListComponent,
  GamesListComponent,
  GamesUpdateComponent,
  GamesCreateComponent,
  UsersListComponent,
  UsersCreateComponent,
  UsersUpdateComponent,
];

@NgModule({
  declarations: [AdminComponent, ...views],
  imports: [CommonModule, AdminRoutingModule, ...modules],
})
export class AdminModule {}
