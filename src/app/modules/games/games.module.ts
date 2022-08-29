import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [GamesComponent, GameComponent],
  imports: [CommonModule, GamesRoutingModule, ComponentsModule, MaterialModule],
})
export class GamesModule {}
