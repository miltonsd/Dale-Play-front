import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

// Components
import { GameDetailsComponent } from '@dlp/games/components';
// Vistas
import { StoreComponent } from '@dlp/games/views';
// Guards
import { AuthGuard } from '@dlp/shared/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: StoreComponent,
  },
  {
    path: 'game/:gameId',
    component: GameDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
