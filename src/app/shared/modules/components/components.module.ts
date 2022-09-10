import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NotfoundComponent,
  TableComponent,
  DialogComponent,
  ConfirmDialogComponent,
} from '@dlp/shared/components';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

const components = [
  NotfoundComponent,
  TableComponent,
  DialogComponent,
  ConfirmDialogComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [...components],
})
export class ComponentsModule {}
