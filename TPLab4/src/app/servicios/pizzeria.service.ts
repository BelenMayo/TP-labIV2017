import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PizzeriaService {

  constructor(public http:Http) { }

  ////////////////////////////////////////////////////////////////////////////// PIZZA

  traerTodasLasPizzas(){
    //URL de API REST(funciones.js)
    // let url= 'http://localhost:8080/ApiLab4SP/public/index.php/pizzas';
	let url= 'http://tplab42017.hol.es/ApiLab4SP/public/index.php/pizzas';	
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  traerUnaPizza(idPizza){
    // let url= 'http://localhost:8080/ApiLab4SP/public/index.php/pizza' + idPizza; 
	let url= 'http://tplab42017.hol.es/ApiLab4SP/public/index.php/pizza' + idPizza;
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  agregarPizza(pizza) {
    let datos={ nombre:pizza.nombre,
                precio :pizza.precio,
                foto:pizza.foto,
              };
    
    // this.http.post("http://localhost:8080/ApiLab4SP/public/index.php/pizza/alta", datos)
	this.http.post("http://tplab42017.hol.es/ApiLab4SP/public/index.php/pizza/alta", datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  modificarPizza(idPizza, pizza) {
    let datos={ nombre:pizza.nombre,
                foto:pizza.precio,
                precio:pizza.foto,
                id:idPizza
              };

    // this.http.put("http://localhost:8080/ApiLab4SP/public/index.php/pizza/actualizar/" + idPizza, datos)
	this.http.put("http://tplab42017.hol.es/ApiLab4SP/public/index.php/pizza/actualizar/" + idPizza, datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  eliminarPizza(idPizza) {
    let datos = {"id": idPizza};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
    headers: headers,
    body : datos
  });
    
    // this.http.delete("http://localhost:8080/ApiLab4SP/public/index.php/pizza/borrar/" + idPizza)
	this.http.delete("http://tplab42017.hol.es/ApiLab4SP/public/index.php/pizza/borrar/" + idPizza)
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
