import { Component } from '@angular/core';
import { PizzeriaService } from './servicios/pizzeria.service';
import { UsuarioService } from './servicios/usuario.service';
import { PedidoService } from './servicios/pedido.service';
import { HttpModule, Http } from '@angular/http';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import * as $ from 'jquery';
import {ModalModule} from "ngx-modal";
import { FileUploader } from 'ng2-file-upload';

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
  public datosPizzas: Array<any>;
  items: FirebaseListObservable<any[]>;
  public user= "";
  public pass= "";
  public userLogin= "";
  public passLogin= "";


  //////////////////////////////////////////// Constructor
  constructor(public datosPizz: PizzeriaService, public datosUsu: UsuarioService, public datosPed: PedidoService,
                public db: AngularFireDatabase ,public angfire: AngularFireModule){
    
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
  }

///////////////////////////////////////////////////////////////////// ABM PIZZA
  
  // Traer Pizza
  traerUnaPizza($id){
    this.datosPizz.traerUnaPizza($id)
      .then(datosPizz => {
      console.info("datos persona", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  // Borrar Pizza
  borrarPizza($id){
    this.datosPizz.eliminarPizza($id);
  }
  
  // Guardar Pizza
  altaPizza(){
    let nuevaPizza={nombre:this.id,
                      apellido:this.nombre,
                      foto:this.precio,
                      password:this.foto
                    };
    this.datosPizz.agregarPizza(nuevaPizza);
  }

///////////////////////////////////////////////////////////////////// ABM USUARIO

  // Traer Usuario
  traerUnUsuario($idUsuario){
    this.datosUsu.traerUnUsuario($idUsuario)
      .then(datosUsu => {
      console.info("datos persona", datosUsu);
      this.datosUsuarios= datosUsu;
    })
  }

  // Borrar Usuario
  borrarUsuario($idUsuario){
    this.datosUsu.eliminarUsuario($idUsuario);
  }
  
  // Guardar Usuario
  altaUsuario(){
    let nuevoUsuario={nombre:this.id,
                      apellido:this.nombre,
                      perfil:this.perfil,
                    };
    this.datosUsu.agregarUsuario(nuevoUsuario);
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
  }
  
  // Guardar Pedido
  altaPedido(){
    let nuevoPedido={ usuario:this.usuario,
                      descripcion:this.descripcion,
                      total:this.total,
                    };
    this.datosPed.agregarPedido(nuevoPedido);
  }

/////////////////////////////////////////////////////////////////////// LOGIN
  
  // Registrarse
  registrarse(){
    if(this.user != "" && this.pass != ""){  
     this.items.push({
          usuario: this.user,
          clave: this.pass
      });
    } 

     this.user="",
     this.pass="";
  }

  // Loguearse
  login(){
    if(this.userLogin != "" && this.passLogin != ""){  

    } 

     this.user="",
     this.pass="";
  }

}
