CREATE DATABASE axoserdb;

USE axoserdb;

CREATE TABLE roles (
    id INT(2) NOT NULL AUTO_INCREMENT,
    rol VARCHAR(20) DEFAULT NULL,
    descripcion TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE monedas (
    id INT(3) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    abreviacion VARCHAR(10) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE formas_pago (
    id INT(2) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE clientes (
    id INT(5) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(55) DEFAULT NULL,
    correo_1 VARCHAR(55) DEFAULT NULL,
    correo_2 VARCHAR(55) DEFAULT NULL,
    telefono_1 INT(10) DEFAULT NULL,
    telefono_2 INT(10) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE usuarios (
    id INT(3) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) DEFAULT NULL,
    correo VARCHAR(55) DEFAULT NULL,
    contraseña VARCHAR(25) DEFAULT NULL,
    tipo_usuario INT(2),
    PRIMARY KEY (id)
)

CREATE TABLE unidades_negocio (
    id INT(2) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    localizacion VARCHAR(85) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE pagos(
    id INT(11) NOT NULL AUTO_INCREMENT,
    fecha_sistema DATE DEFAULT NULL,
    fecha_pago DATE DEFAULT NULL,
    unidad_negocio INT(2),
    orden INT(11),
    usuario INT(3),
    pago INT(10),
    moneda INT(3),
    forma_pago INT(2),
    nota_pago TEXT,
    PRIMARY KEY (id)
)

CREATE TABLE deudas(
    orden VARCHAR(11),
    fecha_sistema DATE DEFAULT NULL,
    fecha_venta DATE DEFAULT NULL,
    unidad_negocio INT(2),
    retraso_dias INT(3),
    retraso_semanas INT(2),
    responsable INT(3),
    descripcion TEXT,
    cliente INT(5),
    deuda_inicial INT(10),
    pagos INT(10),
    deuda_final INT(10),
    notas TEXT,
    moneda INT(3),
    PRIMARY KEY (orden)
)