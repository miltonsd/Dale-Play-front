import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Components
import { MetricsComponent } from './components/metrics/metrics.component';
// Servicios
import { DashboardService } from '@dlp/home/services';
// Views
import { AboutComponent, FaqComponent } from '@dlp/home/views';

const modules = [ComponentsModule, MaterialModule];
const views = [AboutComponent, FaqComponent];

@NgModule({
  declarations: [HomeComponent, MetricsComponent, ...views],
  imports: [CommonModule, HomeRoutingModule, ...modules],
  providers: [DashboardService],
})
export class HomeModule {}
