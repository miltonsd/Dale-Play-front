import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GameComponent } from './components/game/game.component';

// Views
import { StoreComponent } from './views/store/store.component';
// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Servicios
import { GamesService } from './services/games.service';

const modules = [ComponentsModule, MaterialModule];
@NgModule({
  declarations: [GamesComponent, StoreComponent, GameComponent],
  imports: [CommonModule, GamesRoutingModule, ...modules],
  providers: [GamesService],
})
export class GamesModule {}
