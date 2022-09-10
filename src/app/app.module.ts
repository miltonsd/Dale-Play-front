import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

// Módulos compartidos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Importación del Header y el Footer
import { HeaderComponent, FooterComponent } from '@dlp/core/components';
// Servicio que envia el token como header de la request HTTP
import { TokenInterceptorService } from '@dlp/shared/services';
// Guards
import { AdminGuard, AuthGuard } from '@dlp/shared/guards';

const modules = [ComponentsModule, MaterialModule];
const components = [HeaderComponent, FooterComponent];
@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...modules,
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
