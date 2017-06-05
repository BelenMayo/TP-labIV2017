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

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  title: string= 'Listado de Pizzas';
  public mostrar: any;

  public nombre: string= "";
  public precio: string= "";
  public foto: string= "";

  public datosPizzas: Array<any>;

  constructor(public datosPizz: PizzeriaService){
    console.log(this.datosPizzas);
    datosPizz.traerTodasLasPizzas()
    .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  traerUnaPersona($id){
    this.datosPizz.traerUnaPizza($id)
      .then(datosPizz => {
      console.info("datos pizza", datosPizz);
      this.datosPizzas= datosPizz;
    })
  }

  borrarPizza($id){
    this.datosPizz.eliminarPizza($id);
  }
  
  altaPizza(){
    alert(this.nombre + " " + this.precio + " " + this.foto); 
    let nuevaPizza={nombre:this.nombre,
                      apellido:this.precio,
                      foto:this.foto,
                    };
    this.datosPizz.agregarPizza(nuevaPizza);
  }

}
