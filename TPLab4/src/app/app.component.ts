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

  public mbPizza:  "";
  public mmIdPizza:  "";
  public mmNombrePizza:  "";
  public mmPrecioPizza:  "";
  public mmFotoPizza:  "";

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

  public mbPedido:  "";
  public mmIdPedido:  "";
  public mmUsuarioPedido:  "";
  public mmDescripcionPedido:  "";
  public mmTotalPedido:  "";

  //Login
  items: FirebaseListObservable<any[]>;
  public user= "";
  public mail= "";
  public pass= "";
  public email= "";
  public password= "";
  public validaLogin="";
  public completarCamposLogin= "";
  public completarCamposSignUp= "";
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
  
  // Traer Pizzas
  TraerTodasLasPizzas(){    
        this.datosPizz.traerTodasLasPizzas()
        .then(datosPizz => {
        console.info("datos pizza", datosPizz);
        this.datosPizzas= datosPizz;
        }).catch( error => {
          console.log(error);
        });
    }

  // Traer Pizza
  traerUnaPizza($id){
    this.datosPizz.traerUnaPizza($id)
      .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  abrirModalBorrarPizza($id){
    this.mbPizza= $id;
    document.getElementById("mBorrarPizza").click();
  }

  // Borrar Pizza
  borrarPizza($id){
    this.datosPizz.eliminarPizza($id);
    document.getElementById("cerrarBorrarPizza").click();

      var temp=this;
      setTimeout(function(){
          temp.TraerTodasLasPizzas();
      }, 500);  
              
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

      var temp=this;
      setTimeout(function(){
          temp.TraerTodasLasPizzas();
      }, 600);  
  }

  abrirModalModificarPizza($id, $nombre, $precio, $foto){
    this.mmIdPizza= $id;
    this.mmNombrePizza= $nombre;
    this.mmPrecioPizza= $precio;
    this.mmFotoPizza= $foto;
    document.getElementById("mModificarPizza").click();
  }

  // Modificar Pizza
  modificarPizza($id){

    let nuevaPizza={
                      nombre:this.mmNombrePizza,
                      precio:this.mmPrecioPizza,
                      foto:this.mmFotoPizza
                    };

    this.datosPizz.modificarPizza($id, nuevaPizza);

      this.mmIdPizza= "";
      this.mmNombrePizza= "";
      this.mmPrecioPizza= "";
      this.mmFotoPizza= ""; 
      document.getElementById("cerrarModificarPizza").click();

        var temp=this;
          setTimeout(function(){
          temp.TraerTodasLasPizzas();
        }, 600);  

    }

///////////////////////////////////////////////////////////////////// ABM USUARIO

  // Traer Usuarios
  TraerTodosLosUsuarios(){    
        this.datosUsu.traerTodosLosUsuarios()
        .then(datosUsu => {
        console.info("datos usuario", datosUsu);
        this.datosUsuarios= datosUsu;
        }).catch( error => {
          console.log(error);
        });
    }

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

  // Traer Pedidos
  TraerTodosLosPedidos(){    
        this.datosPed.traerTodosLosPedidos()
        .then(datosPed => {
        console.info("datos pedido", datosPed);
        this.datosPedidos= datosPed;
        }).catch( error => {
          console.log(error);
        });
    }

  // Traer Pedido
  traerUnPedido($idPedido){
    this.datosPed.traerUnPedido($idPedido)
      .then(datosPed => {
      console.info("datos pedido", datosPed);
      this.datosPedidos= datosPed;
    })
  }

  abrirModalBorrarPedido($id){
    this.mbPedido= $id;
    document.getElementById("mBorrarPedido").click();
  }

  // Borrar Pedido
  borrarPedido($idPedido){
    this.datosPed.eliminarPedido($idPedido);
    document.getElementById("cerrarBorrarPedido").click();

        var temp=this;
          setTimeout(function(){
          temp.TraerTodosLosPedidos();
        }, 600);  
  }
  
  // Guardar Pedido
  altaPedido(){
    let nuevoPedido={ usuario:this.usuario,
                      descripcion:this.descripcion,
                      total:this.total,
                    };
    this.datosPed.agregarPedido(nuevoPedido);
    document.getElementById("cerrarAgregarPedido").click();

        var temp=this;
          setTimeout(function(){
          temp.TraerTodosLosPedidos();
        }, 700);  
  }

  abrirModalModificarPedido($id, $usuario, $descripcion, $total){
    this.mmIdPizza= $id;
    this.mmUsuarioPedido= $usuario;
    this.mmDescripcionPedido= $descripcion;
    this.mmTotalPedido= $total;
    document.getElementById("mModificarPedido").click();
  }

  // Modificar Pedido
  modificarPedido($id){

    let nuevoPedido={
                      usuario:this.usuario,
                      descripcion:this.descripcion,
                      precio:this.total
                    };

    this.datosPed.modificarPedido($id, nuevoPedido);

      this.mmIdPedido= "";
      this.mmUsuarioPedido= "";
      this.mmDescripcionPedido= "";
      this.mmTotalPedido= ""; 
      document.getElementById("cerrarModificarPedido").click();

        var temp=this;
          setTimeout(function(){
          temp.TraerTodosLosPedidos();
        }, 700);  

    }

/////////////////////////////////////////////////////////////////////// LOGIN
  
  // Login
  login() {    
    if(this.validaCamposLogin() == true){
        if(this.authService.login(this.mail, this.password)){
            console.log("LOGUEADO!!!");
        } else {
            console.log("Error en Login!!!");
        }

        this.mail = this.password = "";
        this.completarCamposSignUp= "";
        this.completarCamposLogin= "";

        document.getElementById("cerrarLogin").click();
      } else {
        this.completarCamposLogin= "Por favor, complete todos los campos";
      }
    }

  // Logout
  logout() {
        this.authService.logout();
      }

  // Registrar
  registrar(){
    if(this.validaCamposSignUp() == true){
        if(this.authService.signup(this.email, this.pass)){
          this.email = this.pass = "";
          this.completarCamposSignUp= "";
        } else {
          this.completarCamposSignUp= "Error en registración";
        }
      } else {
        this.completarCamposSignUp= "Por favor, complete todos los campos";
      }
    }
    

  // Validación de campos
    validaCamposLogin(): boolean{
        if(this.mail == "") { return false; }
        if(this.password == "") { return false; }
        else { return true; }
    }

    validaCamposSignUp(): boolean{
        if(this.email == "") { return false; }
        if(this.pass == "") { return false; }
        else { return true; }
    }

  // Perfil ////////////////////////////////////////////////////////////////////////////////

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
