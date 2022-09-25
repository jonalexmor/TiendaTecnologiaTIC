-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.10.1-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tienda_tic
CREATE DATABASE IF NOT EXISTS `tienda_tic` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tienda_tic`;

-- Volcando estructura para tabla tienda_tic.alquiler
CREATE TABLE IF NOT EXISTS `alquiler` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`,`username`,`fecha`) USING BTREE,
  KEY `FK__usuarios` (`username`),
  CONSTRAINT `FK__articulo` FOREIGN KEY (`id`) REFERENCES `articulo` (`id`),
  CONSTRAINT `FK__usuario` FOREIGN KEY (`username`) REFERENCES `usuario` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tienda_tic.alquiler: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `alquiler` DISABLE KEYS */;
INSERT INTO `alquiler` (`id`, `username`, `fecha`) VALUES
	(1, 'prueba1', '2022-09-24 20:07:09'),
	(2, 'prueba1', '2022-09-24 18:57:09');
/*!40000 ALTER TABLE `alquiler` ENABLE KEYS */;

-- Volcando estructura para tabla tienda_tic.articulo
CREATE TABLE IF NOT EXISTS `articulo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `inventario` int(11) DEFAULT NULL,
  `novedad` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tienda_tic.articulo: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` (`id`, `nombre`, `categoria`, `tipo`, `inventario`, `novedad`) VALUES
	(1, 'Pantalla 19 pulgadas', 'Hardware', 'Monitor', 19, 0),
	(2, 'Armazón torre gamer', 'Hardware', 'Torre', 19, 0),
	(3, 'Teclado Inalámbrico', 'Hardware', 'Periferico', 20, 0),
	(4, 'Teclado USB', 'Hardware', 'Periferico', 20, 0),
	(5, 'Mouse Inalámbrico', 'Hardware', 'Periferico', 20, 1),
	(6, 'Mouse USB', 'Hardware', 'Periferico', 4, 0),
	(7, 'Office 365', 'Software', 'Licencia', 7, 0),
	(8, 'Portatil Dell', 'Hardware', 'Portatiles', 6, 0),
	(9, 'Portatil Toshiba', 'Hardware', 'Portatiles', 3, 1),
	(10, 'Licencia Windows 11', 'Software', 'Licencia', 14, 1);
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;

-- Volcando estructura para tabla tienda_tic.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `username` varchar(100) NOT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `credito` double(22,2) DEFAULT NULL,
  `leasing` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla tienda_tic.usuario: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`username`, `contrasena`, `nombre`, `apellidos`, `email`, `credito`, `leasing`) VALUES
	('jonathan', '123', 'Jonathan', 'Morcillo', 'r@gmail.com', 1000.00, 1),
	('prueba1', '123', 'Jonathan Alexander', 'Ramos', 'raptoring349@gmail.com', 82000.00, 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
