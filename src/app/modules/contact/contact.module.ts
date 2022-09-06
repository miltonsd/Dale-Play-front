import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { CreateContactComponent } from './views/create-contact/create-contact.component';
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';

const modules = [ComponentsModule, MaterialModule];
@NgModule({
  declarations: [ContactComponent, CreateContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    ...modules,
  ],
})
export class ContactModule {}
