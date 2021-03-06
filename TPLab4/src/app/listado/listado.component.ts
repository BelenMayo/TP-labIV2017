import { Component } from '@angular/core';
import { PizzeriaService } from '../servicios/pizzeria.service';
import { HttpModule, Http } from '@angular/http';


const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
 

@Component({
  selector: 'app-root',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

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
    let nuevaPizza={nombre:this.nombre,
                      precio:this.precio,
                      foto:this.foto,
                    };
    this.datosPizz.agregarPizza(nuevaPizza);
  }

}
