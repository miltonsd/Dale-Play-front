import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';

const modules = [ComponentsModule, MaterialModule];
@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, ...modules],
})
export class AdminModule {}
