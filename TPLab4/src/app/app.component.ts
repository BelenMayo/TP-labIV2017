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

//////////////////////////////////////////////// PUNTUAR
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

/////////////////////////////////////////////////////////////////// ABM PIZZA

  title: string= 'Listado de Pizzas';
  public id= "";
  public nombre= "";
  public precio= "";
  public foto= "";

  public datosPizzas: Array<any>;

  items: FirebaseListObservable<any[]>;
  public user= "";
  public pass= "";

  constructor(public datosPizz: PizzeriaService, public datosUsu: UsuarioService, public datosPed: PedidoService,
                public db: AngularFireDatabase ,public angfire: AngularFireModule){

    this.items = db.list('/items'); 
    console.log("datos usuarios", this.items);

    datosPizz.traerTodasLasPizzas()
    .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })

    this.datosUsu.traerTodosLosUsuarios()
    .then(datosUsu => {
      console.info("datos usuario", datosUsu);
      this.datosUsuarios= datosUsu;
    })

    this.datosPed.traerTodosLosPedidos()
    .then(datosPed => {
      console.info("datos pedido", datosPed);
      this.datosPedidos= datosPed;
    })
  }

  traerUnaPizza($id){
    this.datosPizz.traerUnaPizza($id)
      .then(datosPizz => {
      console.info("datos persona", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  borrarPizza($id){
    this.datosPizz.eliminarPizza($id);
  }
  
  altaPizza(){
    let nuevaPizza={nombre:this.id,
                      apellido:this.nombre,
                      foto:this.precio,
                      password:this.foto
                    };
    this.datosPizz.agregarPizza(nuevaPizza);
  }

  /////////////////////////////////////////////////////////////////// ABM USUARIO

  titleUsuario: string= 'Listado de Usuarios';
  public idUsuario= "";
  public nombreUsuario= "";
  public apellido= "";
  public perfil= "";

  public datosUsuarios: Array<any>;


  traerUnUsuario($idUsuario){
    this.datosUsu.traerUnUsuario($idUsuario)
      .then(datosUsu => {
      console.info("datos persona", datosUsu);
      this.datosUsuarios= datosUsu;
    })
  }

  borrarUsuario($idUsuario){
    this.datosUsu.eliminarUsuario($idUsuario);
  }
  
  altaUsuario(){
    let nuevoUsuario={nombre:this.id,
                      apellido:this.nombre,
                      perfil:this.perfil,
                    };
    this.datosUsu.agregarUsuario(nuevoUsuario);
  }

  /////////////////////////////////////////////////////////////////// ABM PEDIDO

  titlePedido: string= 'Listado de Pedidos';
  public idPedido= "";
  public usuario= "";
  public descripcion= "";
  public total= "";

  public datosPedidos: Array<any>;

  traerUnPedido($idPedido){
    this.datosPed.traerUnPedido($idPedido)
      .then(datosPed => {
      console.info("datos pedido", datosPed);
      this.datosPedidos= datosPed;
    })
  }

  borrarPedido($idPedido){
    this.datosPed.eliminarPedido($idPedido);
  }
  
  altaPedido(){
    let nuevoPedido={ usuario:this.usuario,
                      descripcion:this.descripcion,
                      total:this.total,
                    };
    this.datosPed.agregarPedido(nuevoPedido);
  }

  login(){
    this.user= $("#usuario").val();
    this.pass= $("#clave").val();

        this.items.push({
          //usuario: this.user,
          //clave: this.pass
          usuario: "Belen",
          clave: "1234"
      });
  }
}
