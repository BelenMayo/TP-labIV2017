import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PizzeriaService {

  constructor(public http:Http) { }

  traerTodasLasPizzas(){
    //URL de API REST(funciones.js)
    let url= 'http://localhost:8080/api_pizzeria/apirest.php/traerTodas'; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  traerUnaPizza(idPizza){
    let url= 'http://localhost:8080/api_pizzeria/apirest.php/traerUna/' + idPizza; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  eliminarPizza(idPizza) {
    let datos = {"id": idPizza};

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
    headers: headers,
    body : datos
  });
    
    this.http.delete("http://localhost:8080/api_pizzeria/apirest.php/registro", options)
             .toPromise()
             .then()
             .catch(this.error)
  }

  agregarPizza(pizza) {
    let datos={ nombre:pizza.nombre,
                precio :pizza.precio,
                foto:pizza.foto,
              };
    
    this.http.post("http://localhost:8080/api_pizzeria/apirest.php/registro", datos)
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