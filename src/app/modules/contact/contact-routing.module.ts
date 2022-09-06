import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { CreateContactComponent } from './views/create-contact/create-contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'create', component: CreateContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
