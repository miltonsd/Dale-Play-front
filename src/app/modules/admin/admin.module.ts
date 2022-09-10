import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Components Users
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { UsersCreateComponent } from '../users/components/users-create/users-create.component';
import { UsersUpdateComponent } from '../users/components/users-update/users-update.component';
// Components Games
import { GamesUpdateComponent } from '../games/components/games-update/games-update.component';
import { GamesCreateComponent } from '../games/components/games-create/games-create.component';
// Views
import { GamesListComponent } from '@dlp/admin/views';

const modules = [ReactiveFormsModule, ComponentsModule, MaterialModule];
const views = [GamesListComponent];

@NgModule({
  declarations: [
    AdminComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersUpdateComponent,
    GamesCreateComponent,
    GamesUpdateComponent,
    ...views,
  ],
  imports: [CommonModule, AdminRoutingModule, ...modules],
})
export class AdminModule {}
