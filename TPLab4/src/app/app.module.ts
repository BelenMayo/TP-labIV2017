import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PizzeriaService } from './servicios/pizzeria.service';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { AltaComponent } from './alta/alta.component';
import { LocalesComponent } from './locales/locales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PedidosComponent } from './pedidos/pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    AltaComponent,
    LocalesComponent,
    EstadisticasComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [PizzeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
