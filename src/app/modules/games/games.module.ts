import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { FormsModule } from '@angular/forms';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Components
import { GameComponent } from '@dlp/games/components';
// Servicios
import { GamesService, UserGamesService } from '@dlp/games/services';
// Views
import { GameDetailsComponent, StoreComponent } from '@dlp/games/views';

const modules = [FormsModule, ComponentsModule, MaterialModule];
const components = [GameComponent];
const views = [StoreComponent, GameDetailsComponent];

@NgModule({
  declarations: [GamesComponent, ...components, ...views],
  imports: [CommonModule, GamesRoutingModule, ...modules],
  providers: [GamesService, UserGamesService],
})
export class GamesModule {}
