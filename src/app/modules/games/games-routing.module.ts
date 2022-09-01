import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
// Guards
import { AuthGuard } from '@dlp/shared/guards';
// Vistas
import { StoreComponent } from '@dlp/games/views';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: StoreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
