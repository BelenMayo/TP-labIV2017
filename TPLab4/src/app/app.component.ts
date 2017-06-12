import { Component } from '@angular/core';
import { PizzeriaService } from './servicios/pizzeria.service';
import { HttpModule, Http } from '@angular/http';

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

/////////////////////////////////////////////// ABM PIZZA

  title: string= 'Listado de Pizzas';
  public id= "";
  public nombre= "";
  public precio= "";
  public foto= "";

  public datosPizzas: Array<any>;

  constructor(public datosPizz: PizzeriaService){
    console.log(this.datosPizzas);
    datosPizz.traerTodasLasPizzas()
    .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
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
    let nuevaPersona={nombre:this.id,
                      apellido:this.nombre,
                      foto:this.precio,
                      password:this.foto
                    };
    this.datosPizz.agregarPizza(nuevaPersona);
  }
}
