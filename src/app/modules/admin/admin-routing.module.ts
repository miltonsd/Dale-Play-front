import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

// Guards
import { AdminGuard, AuthGuard } from '@dlp/shared/guards';
// Views
import {
  ContactListComponent,
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
        path: 'contact',
        component: ContactListComponent,
      },
      {
        path: 'users',
        component: UsersListComponent,
        children: [
          {
            path: 'create',
            component: UsersCreateComponent,
          },
          {
            path: 'edit/:userId',
            component: UsersUpdateComponent,
          },
        ],
      },
      {
        path: 'games',
        component: GamesListComponent,
        children: [
          {
            path: 'create',
            component: GamesCreateComponent,
          },
          {
            path: 'edit/:gameId',
            component: GamesUpdateComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
