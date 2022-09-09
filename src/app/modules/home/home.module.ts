import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
// Servicios
import { DashboardService } from './services/dashboard.service';
// Views
import { AboutComponent, FaqComponent } from '@dlp/home/views';

const views = [AboutComponent, FaqComponent];
@NgModule({
  declarations: [HomeComponent, ...views],
  imports: [CommonModule, HomeRoutingModule],
  providers: [DashboardService],
})
export class HomeModule {}
