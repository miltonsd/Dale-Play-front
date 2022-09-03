import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './shared/components/notfound/notfound.component';

import { AdminGuard, AuthGuard } from '@dlp/shared/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'store',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./modules/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'admin',
    canLoad: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
