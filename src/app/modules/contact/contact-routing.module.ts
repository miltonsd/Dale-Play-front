import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import {
  ContactDetailsComponent,
  CreateContactComponent,
} from '@dlp/contact/views';
import { AdminGuard, AuthGuard, UserGuard } from '@dlp/shared/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AdminGuard],
    component: ContactComponent,
  },
  {
    path: 'create',
    canActivate: [AuthGuard, UserGuard],
    component: CreateContactComponent,
  },
  {
    path: 'message/:msgId',
    canActivate: [AuthGuard, AdminGuard],
    component: ContactDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
