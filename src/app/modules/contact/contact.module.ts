import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
import {
  CreateContactComponent,
  ContactDetailsComponent,
} from '@dlp/contact/views';

const modules = [ComponentsModule, MaterialModule];
const views = [CreateContactComponent, ContactDetailsComponent];
@NgModule({
  declarations: [ContactComponent, ...views],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    ...modules,
  ],
})
export class ContactModule {}
