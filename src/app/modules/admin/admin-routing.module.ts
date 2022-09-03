import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

// Guards
import { AuthGuard } from '@dlp/shared/guards';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
