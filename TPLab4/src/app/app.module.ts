import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

// Servicios
import { PizzeriaService } from './servicios/pizzeria.service';
import { UsuarioService } from './servicios/usuario.service';
import { PedidoService } from './servicios/pedido.service';

// Bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

// Componentes
import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { LocalesComponent } from './locales/locales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Modal
import { ModalModule } from "ngx-modal";

// Maps
import { AgmCoreModule } from '@agm/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from 'app/servicios/auth.service';
import { environment } from 'environments/environment';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireAuthModule } from 'angularfire2/auth';


// export const firebaseConfig = {
//     apiKey: "AIzaSyCt4ypL9y1DT_iq4m6dNaLYyIle0jX9QBg",
//     authDomain: "lab4tp.firebaseapp.com",
//     databaseURL: "https://lab4tp.firebaseio.com",
//     projectId: "lab4tp",
//     storageBucket: "lab4tp.appspot.com",
//     messagingSenderId: "968933227950"
// };


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
    ModalModule,
    //AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt4ypL9y1DT_iq4m6dNaLYyIle0jX9QBg'
    })
  ],
  providers: [PizzeriaService, UsuarioService, PedidoService, AngularFireModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
