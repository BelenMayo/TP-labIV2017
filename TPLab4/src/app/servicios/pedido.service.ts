import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class PedidoService {

  constructor(public http:Http) { }

////////////////////////////////////////////////////////////////////////////// USUARIO

  traerTodosLosPedidos(){
    let url= 'http://localhost:8080/ApiLab4SP/public/index.php/pedidos'; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  traerUnPedido(idPedido){
    let url= 'http://localhost:8080/ApiLab4SP/public/index.php/pedido' + idPedido; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  agregarPedido(pedido) {
    let datos={ usuario:pedido.usuario,
                descripcion :pedido.descripcion,
                total:pedido.total,
              };
    
    this.http.post("http://localhost:8080/ApiLab4SP/public/index.php/pedido/alta", datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  eliminarPedido(idPedido) {
    let datos = {"id": idPedido};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
    headers: headers,
    body : datos
  });
    
    this.http.delete("http://localhost:8080/ApiLab4SP/public/index.php/pedido/borrar/" + idPedido)
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