import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

// Servicios
import { PizzeriaService } from './servicios/pizzeria.service';
import { UsuarioService } from './servicios/usuario.service';
import { PedidoService } from './servicios/pedido.service';

// Maps
import { AgmCoreModule } from '@agm/core';

// Modal
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from "ngx-modal";

// Firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './servicios/auth.service';

declare var jQuery:any;
import * as $ from 'jquery';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

////////////////////////////////////// PUNTUAR
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;
 
  public overStar:number;
  public percent:number;
 
  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };
 
  public resetStar():void {
    this.overStar = void 0;
  }
////////////////////////////////////////////////////////////////////////////////////////// CONSTRUCTOR Y VARIABLES
  
  /////////////////////////////////////////////// Variables
  
  //Pizza
  title: string= 'Listado de Pizzas';
  public id= "";
  public nombre= "";
  public precio= "";
  public foto= "";
  public nombrePizza= "";
  public precioPizza= "";
  public datosPizzas: Array<any>;

  //Usuario
  titleUsuario: string= 'Listado de Usuarios';
  public idUsuario= "";
  public nombreUsuario= "";
  public apellido= "";
  public perfil= "";
  public datosUsuarios: Array<any>;

  //Pedido
  titlePedido: string= 'Listado de Pedidos';
  public idPedido= "";
  public usuario= "";
  public descripcion= "";
  public total= "";
  public datosPedidos: Array<any>;


  //Login
  items: FirebaseListObservable<any[]>;
  public user= "";
  public mail= "";
  public pass= "";
  public email= "";
  public password= "";
  public validaLogin="";
  usuarioLogin: Observable<firebase.User>;

  // Perfiles
  public administrador= "";
  public empleado= "";
  public cliente= "";

  //Maps
  latitud: number = -34.761403;
  longitud: number = -58.403909;
  latitud2: number = -34.745494;
  longitud2: number = -58.402984;
  latitud3: number = -34.801383;
  longitud3: number = -58.392185;

  //////////////////////////////////////////// Constructor
  constructor(public datosPizz: PizzeriaService, public datosUsu: UsuarioService, public datosPed: PedidoService,
                public db: AngularFireDatabase ,public angfire: AngularFireModule, public afAuth: AngularFireAuth,
                public authService: AuthService){
    
    // Firebase
    this.items = db.list('/items'); 
    console.log("datos usuarios", this.items);
    
    // Pizzas
    datosPizz.traerTodasLasPizzas()
    .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })

    // Usuarios
    this.datosUsu.traerTodosLosUsuarios()
    .then(datosUsu => {
      console.info("datos usuario", datosUsu);
      this.datosUsuarios= datosUsu;
    })

    // Pedidos
    this.datosPed.traerTodosLosPedidos()
    .then(datosPed => {
      console.info("datos pedido", datosPed);
      this.datosPedidos= datosPed;
    })

    // AUTH
    this.usuarioLogin = afAuth.authState;
  }

///////////////////////////////////////////////////////////////////// ABM PIZZA
  
  // Traer Pizza
  traerUnaPizza($id){
    this.datosPizz.traerUnaPizza($id)
      .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  // Borrar Pizza
  borrarPizza($id){
    this.datosPizz.eliminarPizza($id);
    document.getElementById("cerrarBorrarPizza").click();
  }
  
  // Guardar Pizza
  altaPizza(){
    let nuevaPizza={
                      nombre:this.nombre,
                      precio:this.precio,
                      foto:this.foto
                    };

    console.log(this.nombre,this.precio,this.foto);
    this.datosPizz.agregarPizza(nuevaPizza);
    document.getElementById("cerrarAgregarPizza").click();
  }

  // Modificar Pizza
  modificarPizza($id){

      this.datosPizz.traerUnaPizza($id)
        .then(datosPizz => {
        console.info("datos pizza", datosPizz);
        this.datosPizzas= datosPizz;
      })
          
      document.getElementById("modalModificarPizza").click();

    }

///////////////////////////////////////////////////////////////////// ABM USUARIO

  // Traer Usuario
  traerUnUsuario($idUsuario){
    this.datosUsu.traerUnUsuario($idUsuario)
      .then(datosUsu => {
      console.info("datos usuario", datosUsu);
      this.datosUsuarios= datosUsu;
    })
  }

  // Borrar Usuario
  borrarUsuario($idUsuario){
    this.datosUsu.eliminarUsuario($idUsuario);
    document.getElementById("cerrarBorrarUsuario").click();
  }
  
  // Guardar Usuario
  altaUsuario(){
    let nuevoUsuario={nombre:this.id,
                      apellido:this.nombre,
                      perfil:this.perfil,
                    };
    this.datosUsu.agregarUsuario(nuevoUsuario);
    document.getElementById("cerrarAgregarUsuario").click();
  }

/////////////////////////////////////////////////////////////////////// ABM PEDIDO

  // Traer Pedido
  traerUnPedido($idPedido){
    this.datosPed.traerUnPedido($idPedido)
      .then(datosPed => {
      console.info("datos pedido", datosPed);
      this.datosPedidos= datosPed;
    })
  }

  // Borrar Pedido
  borrarPedido($idPedido){
    this.datosPed.eliminarPedido($idPedido);
    document.getElementById("cerrarBorrarPedido").click();
  }
  
  // Guardar Pedido
  altaPedido(){
    let nuevoPedido={ usuario:this.usuario,
                      descripcion:this.descripcion,
                      total:this.total,
                    };
    this.datosPed.agregarPedido(nuevoPedido);
    document.getElementById("cerrarAgregarPedido").click();
  }

/////////////////////////////////////////////////////////////////////// LOGIN
  
  // Login y registrar
  login() {
    if(this.authService.login(this.mail, this.password)){
        console.log("LOGUEADO!!!");
    } else {
        console.log("Error en Login!!!");
    }
    this.mail = this.password = '';
    document.getElementById("cerrarLogin").click();
  } 

  logout() {
    this.authService.logout();
  }

  registrar(){
    this.authService.signup(this.email, this.pass);
    this.email = this.pass = '';
  }

  setEncargado(){
    this.mail = "encargado@gmail.com";
    this.password = "123456"
    
  }

  setEmpleado(){
    this.mail = "empleado@gmail.com";
    this.password = "123456"
  }

  setCliente(){
    this.mail = "cliente@gmail.com";
    this.password = "123456"
  }

}
