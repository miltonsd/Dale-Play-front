import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from '@dlp/shared/components';

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
    path: 'profile',
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
    path: 'developers',
    loadChildren: () =>
      import('./modules/developers/developers.module').then(
        (m) => m.DevelopersModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./modules/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
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
