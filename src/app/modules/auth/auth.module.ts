import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
// Views
import { LoginComponent, RegisterComponent } from '@dlp/auth/views';
// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Servicios
import { AuthService } from './services/auth.service';

const views = [LoginComponent, RegisterComponent];
const modules = [ComponentsModule, MaterialModule];

@NgModule({
  declarations: [AuthComponent, ...views],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ...modules],
  providers: [AuthService],
})
export class AuthModule {}
