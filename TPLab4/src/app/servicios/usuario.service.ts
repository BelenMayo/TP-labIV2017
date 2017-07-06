import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {

  constructor(public http:Http) { }
  
////////////////////////////////////////////////////////////////////////////// USUARIO

  traerTodosLosUsuarios(){
    //URL de API REST(funciones.js)
    let url= 'http://localhost:8080/ApiLab4SP/public/index.php/usuarios'; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  traerUnUsuario(idUsuario){
    let url= 'http://localhost:8080/ApiLab4SP/public/index.php/usuario' + idUsuario; 
    
      return this.http
        .get(url)
        .toPromise()
        .then(this.extraerDatos)
        .catch(this.error);
  }

  agregarUsuario(usuario) {
    let datos={ nombre:usuario.nombre,
                apellido:usuario.apellido,
                perfil:usuario.perfil,
                calle:usuario.calle,
                numero:usuario.numero,
                localidad:usuario.localidad,
                telefono:usuario.telefono,
                mail:usuario.mail,
              };
    
    this.http.post("http://localhost:8080/ApiLab4SP/public/index.php/usuario/alta", datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  modificarUsuario(idUsuario, usuario) {
    let datos={ nombre:usuario.nombreUsuario,
                apellido:usuario.apellido,
                perfil:usuario.perfil,
                calle:usuario.calle,
                numero:usuario.numero,
                localidad:usuario.localidad,
                telefono:usuario.telefono,
                mail:usuario.mailUsuario,
              };

    this.http.put("http://localhost:8080/ApiLab4SP/public/index.php/usuario/actualizar/" + idUsuario, datos)
             .toPromise()
             .then()
             .catch(this.error)
  }

  eliminarUsuario(idUsuario) {
    let datos = {"id": idUsuario};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
    headers: headers,
    body : datos
  });
    
    this.http.delete("http://localhost:8080/ApiLab4SP/public/index.php/usuario/borrar/" + idUsuario)
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
