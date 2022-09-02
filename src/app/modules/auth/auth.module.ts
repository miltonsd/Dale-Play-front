import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

// Modulos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Servicios
import { AuthService } from './services/auth.service';
// Views
import { LoginComponent, RegisterComponent } from '@dlp/auth/views';

const modules = [ComponentsModule, MaterialModule];
const views = [LoginComponent, RegisterComponent];

@NgModule({
  declarations: [AuthComponent, ...views],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ...modules],
  providers: [AuthService],
})
export class AuthModule {}
