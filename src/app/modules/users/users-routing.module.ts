import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

// Vistas
import { ProfileComponent } from '@dlp/users/views';
// Guards
import { AuthGuard } from '@dlp/shared/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
