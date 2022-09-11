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
  UsersCreateComponent,
  UsersUpdateComponent,
} from '@dlp/admin/views';

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
