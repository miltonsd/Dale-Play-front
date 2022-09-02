import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Módulos compartidos
import { ComponentsModule, MaterialModule } from '@dlp/shared/modules';
// Importación del Header y el Footer
import { HeaderComponent, FooterComponent } from '@dlp/core/components';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
