import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import {
  ContactDetailsComponent,
  CreateContactComponent,
} from '@dlp/contact/views';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'create', component: CreateContactComponent },
  { path: 'message/:msgId', component: ContactDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
