import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PizzeriaService } from './servicios/pizzeria.service';
import { UsuarioService } from './servicios/usuario.service';
import { PedidoService } from './servicios/pedido.service';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import {ModalModule} from "ngx-modal";

import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { LocalesComponent } from './locales/locales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    LocalesComponent,
    EstadisticasComponent,
    PedidosComponent,
    LoginComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    Ng2BootstrapModule,
    ModalModule
  ],
  providers: [PizzeriaService, UsuarioService, PedidoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
