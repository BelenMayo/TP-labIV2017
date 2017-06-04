import { Component } from '@angular/core';
import { PersonasService } from './servicios/personas.service';
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

  title: string= 'Listado de Personas';
  esFemenino:boolean = true;
  public mostrar: any;

  public nombre: string= "";
  public apellido: string= "";
  public sexo: string= "";
  public dni: string= "";
  public foto: string= "";
  public password: string= "";

  public datosPersonas: Array<any>;

  constructor(public datosPers: PersonasService){
    console.log(this.datosPersonas);
    datosPers.traerTodasLasPersonas()
    .then(datosPers => {
      console.info("datos persona", datosPers);
      this.datosPersonas= datosPers;
    })
  }

  traerUnaPersona($id){
    this.datosPers.traerUnaPersona($id)
      .then(datosPers => {
      console.info("datos persona", datosPers);
      this.datosPersonas= datosPers;
    })
  }

  borrarPersona($id){
    this.datosPers.eliminarPersona($id);
  }
  
  altaPersona(){
    alert(this.nombre + " " + this.apellido + " " + this.dni + " " + this.sexo + " " + this.foto + " " + this.password); 
    let nuevaPersona={nombre:this.nombre,
                      apellido:this.apellido,
                      dni:this.dni,
                      sexo:this.sexo,
                      foto:this.foto,
                      password:this.password
                    };
    this.datosPers.agregarPersona(nuevaPersona);
  }

}
