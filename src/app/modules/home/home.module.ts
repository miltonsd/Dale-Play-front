import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
// Servicios
import { DashboardService } from '@dlp/home/services';
// Views
import { AboutComponent, FaqComponent } from '@dlp/home/views';
import { MetricsComponent } from './components/metrics/metrics.component';

const views = [AboutComponent, FaqComponent];
@NgModule({
  declarations: [HomeComponent, ...views, MetricsComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [DashboardService],
})
export class HomeModule {}
