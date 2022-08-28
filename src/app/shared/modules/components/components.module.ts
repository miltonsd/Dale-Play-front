import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundComponent } from '../../components/notfound/notfound.component';

const components = [NotfoundComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class ComponentsModule {}
