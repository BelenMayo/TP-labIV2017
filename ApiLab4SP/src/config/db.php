<?php

class db{
    /*private $host = 'localhost';
    private $usuario = 'root';
    private $password = '';
    private $base = 'pizzeria';*/
	
	private $host = 'mysql.hostinger.com.ar';
    private $usuario = 'u350095586_belen';
    private $password = 'bel123456';
    private $base = 'u350095586_pizza';

    //conectar BD
    public function conectar(){
        $conexion_mysql = "mysql:host=$this->host;dbname=$this->base";
        $conexionBD = new PDO($conexion_mysql, $this->usuario, $this->password);
        //$conexionBD->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //Arregla la codificacion de la base de datos UTF8
        $conexionBD -> exec("set names utf8");

        return $conexionBD;

    }
}

?>