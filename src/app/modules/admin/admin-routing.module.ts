import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

// Guards
import { AdminGuard, AuthGuard } from '@dlp/shared/guards';
// Views
import {
  GamesListComponent,
  GamesCreateComponent,
  GamesUpdateComponent,
  UsersListComponent,
} from '@dlp/admin/views';
import { UsersCreateComponent } from '../users/components/users-create/users-create.component';
import { UsersUpdateComponent } from '../users/components/users-update/users-update.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'users/create',
        component: UsersCreateComponent,
      },
      {
        path: 'users/edit/:userId',
        component: UsersUpdateComponent,
      },
      {
        path: 'games',
        component: GamesListComponent,
      },
      {
        path: 'games/create',
        component: GamesCreateComponent,
      },
      {
        path: 'games/edit/:gameId',
        component: GamesUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
