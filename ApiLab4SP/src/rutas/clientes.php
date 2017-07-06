<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

///////////////////////////////////////////////////////////////////////////////////////////// PIZZA

//Obtener todas las pizzas
$app->get('/pizzas', function(Request $request, Response $response){
    
    $consulta = 'SELECT * FROM pizza';

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $pizzas = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($pizzas);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});


//Trae una pizza
$app->get('/pizza/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "SELECT * FROM pizza WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $pizza = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($pizza);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Agrega una pizza
$app->post('/pizza/alta', function(Request $request, Response $response){

    $nombre = $request->getParam('nombre');
    $foto = $request->getParam('foto');
    $precio = $request->getParam('precio');

    
    $consulta = "INSERT INTO pizza (nombre, foto, precio) VALUES (:nombre, :foto, :precio)";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':nombre', $nombre);
        $inserta->bindParam(':foto', $foto);
        $inserta->bindParam(':precio', $precio);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Pizza agregada"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Actualiza una pizza
$app->put('/pizza/actualizar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');

    $nombre = $request->getParam('nombre');
    $foto = $request->getParam('foto');
    $precio = $request->getParam('precio');
	
    
    $consulta = "UPDATE pizza SET 
                nombre = :nombre,
                foto = :foto,
                precio = :precio, 
                WHERE id = $id";
    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':nombre', $nombre);
        $inserta->bindParam(':foto', $foto);
        $inserta->bindParam(':precio', $precio);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Pizza actualizada"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Borra una pizza
$app->delete('/pizza/borrar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "DELETE FROM pizza WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->prepare($consulta);
        $ejecutar->execute();
        $db = null;

        echo '{"Notificacion": {"text": "Pizza Borrada"}';

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

///////////////////////////////////////////////////////////////////////////////////////////// PEDIDO

//Obtener todos los pedidos
$app->get('/pedidos', function(Request $request, Response $response){
    
    $consulta = 'SELECT * FROM pedido';

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $pedidos = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($pedidos);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});


//Trae un pedido
$app->get('/pedido/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "SELECT * FROM pedido WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $pedido = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($pedido);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Agrega un pedido
$app->post('/pedido/alta', function(Request $request, Response $response){

    $usuario = $request->getParam('usuario');
    $descripcion = $request->getParam('descripcion');
    $total = $request->getParam('total');

    
    $consulta = "INSERT INTO pedido (usuario, descripcion, total) VALUES (:usuario, :descripcion, :total)";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':usuario', $usuario);
        $inserta->bindParam(':descripcion', $descripcion);
        $inserta->bindParam(':total', $total);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Pedido agregado"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Actualiza un pedido
$app->put('/pedido/actualizar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');

    $usuario = $request->getParam('usuario');
    $descripcion = $request->getParam('descripcion');
    $total = $request->getParam('total');
	
    
    $consulta = "UPDATE pedido SET 
                usuario = :usuario,
                descripcion = :descripcion,
                total = :total, 
                WHERE id = $id";
    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':usuario', $usuario);
        $inserta->bindParam(':descripcion', $descripcion);
        $inserta->bindParam(':total', $total);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Pedido actualizado"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Borra un pedido
$app->delete('/pedido/borrar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "DELETE FROM pedido WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->prepare($consulta);
        $ejecutar->execute();
        $db = null;

        echo '{"Notificacion": {"text": "Pedido Borrado"}';

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});


///////////////////////////////////////////////////////////////////////////////////////////// USUARIO

//Obtener todos los usuarios
$app->get('/usuarios', function(Request $request, Response $response){
    
    $consulta = 'SELECT * FROM usuario';

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $usuarios = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($usuarios);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});


//Trae un usuario
$app->get('/usuario/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "SELECT * FROM usuario WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $usuario = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en JSON
        echo json_encode($usuario);


    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Agrega un usuario
$app->post('/usuario/alta', function(Request $request, Response $response){

    $nombre = $request->getParam('nombre');
    $apellido = $request->getParam('apellido');
    $perfil = $request->getParam('perfil');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');
	$localidad = $request->getParam('localidad');
	$telefono = $request->getParam('telefono');
	$mail = $request->getParam('mail');

    
    $consulta = "INSERT INTO usuario (nombre, apellido, perfil, calle, numero, localidad, telefono, mail) VALUES (:nombre, :apellido, :perfil, :calle, :numero, :localidad, :telefono, :mail)";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':nombre', $nombre);
        $inserta->bindParam(':apellido', $apellido);
        $inserta->bindParam(':perfil', $perfil);
		$inserta->bindParam(':calle', $calle);
		$inserta->bindParam(':numero', $numero);
		$inserta->bindParam(':localidad', $localidad);
		$inserta->bindParam(':telefono', $telefono);
		$inserta->bindParam(':mail', $mail);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Usuario agregado"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Actualiza un usuario
$app->put('/usuario/actualizar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');

    $nombre = $request->getParam('nombre');
    $apellido = $request->getParam('apellido');
    $perfil = $request->getParam('perfil');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');
	$localidad = $request->getParam('localidad');
	$telefono = $request->getParam('telefono');
	$mail = $request->getParam('mail');
	
    
    $consulta = "UPDATE usuario SET 
                nombre = :nombre,
                apellido = :apellido,
                perfil = :perfil,
				calle = :calle,
				numero = :numero,
				localidad = :localidad,
				telefono = :telefono,
				mail = :mail,
                WHERE id = $id";
    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $inserta = $db->prepare($consulta);
        $inserta->bindParam(':nombre', $nombre);
        $inserta->bindParam(':apellido', $apellido);
        $inserta->bindParam(':perfil', $perfil);
		$inserta->bindParam(':calle', $calle);
		$inserta->bindParam(':numero', $numero);
		$inserta->bindParam(':localidad', $localidad);
		$inserta->bindParam(':telefono', $telefono);
		$inserta->bindParam(':mail', $mail);
        $inserta->execute();

        echo '{"Notificacion": {"text": "Usuario actualizado"}';
        

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

//Borra un usuario
$app->delete('/usuario/borrar/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');
    
    $consulta = "DELETE FROM usuario WHERE id=$id";

    try{
        //Instanciamos Base de datos
        $db = new db();

        //conexion
        $db = $db->conectar();
        $ejecutar = $db->prepare($consulta);
        $ejecutar->execute();
        $db = null;

        echo '{"Notificacion": {"text": "Usuario Borrado"}';

    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});