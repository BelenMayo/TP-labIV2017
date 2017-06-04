import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonasService {

  constructor(public http:Http) { }

  traerTodasLasPersonas(){
    //URL de API REST(funciones.js)
    let url= 'http://localhost:8080/abm_apirest/apirest.php/traerTodos'; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  traerUnaPersona(idPersona){
    let url= 'http://localhost:8080/abm_apirest/apirest.php/traerUno/' + idPersona; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  eliminarPersona(idPersona) {
    let datos = {"id": idPersona};

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
    headers: headers,
    body : datos
  });
    
    this.http.delete("http://localhost:8080/abm_apirest/apirest.php/registro", options)
             .toPromise()
             .then()
             .catch(this.error)
  }

  agregarPersona(persona) {
    let datos={ nombre:persona.nombre,
                apellido :persona.apellido,
                sexo:persona.sexo,
                dni:persona.dni,
                foto:persona.foto,
                password:persona.password
              };
    
    this.http.post("http://localhost:8080/abm_apirest/apirest.php/registro", datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  private extraerDatos(res: Response){
    return res.json() || "no hay datos";
  }

  private error(error: Response){
    return error;
  }
}
