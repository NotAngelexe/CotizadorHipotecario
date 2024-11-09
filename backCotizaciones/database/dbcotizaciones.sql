-- MySQL dump 10.13  Distrib 8.0.24, for macos11 (x86_64)
--
-- Host: localhost    Database: cotizaciones
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `password` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'admin','admin','administrador@gmail.com');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco`
--

DROP TABLE IF EXISTS `banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco` (
  `id_banco` int NOT NULL AUTO_INCREMENT,
  `nombre_banco` varchar(45) NOT NULL,
  `interes` double NOT NULL,
  `enganche` double NOT NULL,
  PRIMARY KEY (`id_banco`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco`
--

LOCK TABLES `banco` WRITE;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
INSERT INTO `banco` VALUES (1,'BBVA',13.6,17.5),(2,'HSBC',12.8,18.2),(3,'Infonavit',9,9.4);
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco_plazo`
--

DROP TABLE IF EXISTS `banco_plazo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco_plazo` (
  `id_banco` int NOT NULL,
  `id_plazo` int NOT NULL,
  PRIMARY KEY (`id_banco`,`id_plazo`),
  KEY `fk_banco_has_plazo_plazo1_idx` (`id_plazo`),
  KEY `fk_banco_has_plazo_banco1_idx` (`id_banco`),
  CONSTRAINT `fk_banco_has_plazo_banco1` FOREIGN KEY (`id_banco`) REFERENCES `banco` (`id_banco`),
  CONSTRAINT `fk_banco_has_plazo_plazo1` FOREIGN KEY (`id_plazo`) REFERENCES `plazo` (`id_plazo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_plazo`
--

LOCK TABLES `banco_plazo` WRITE;
/*!40000 ALTER TABLE `banco_plazo` DISABLE KEYS */;
INSERT INTO `banco_plazo` VALUES (1,1),(2,1),(3,1),(1,2),(3,2),(1,3),(2,3);
/*!40000 ALTER TABLE `banco_plazo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `edad` int NOT NULL,
  `sueldo` double NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `fecha_modificacion` date NOT NULL,
  `telefono` bigint NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `rfc_UNIQUE` (`rfc`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (3,'Ana Rodriguez','ANRO123456789',22,51609.44,'2024-11-08',NULL,'2024-11-09',5541234577,'ana.rodriguez@example.com','ana123'),(4,'Jose Angel Flores Esparza','JOES123456789',22,45000,'2024-11-08',NULL,'2024-11-08',5541234577,'esparza@example.com','esparza123'),(5,'Jose esparza@example.com','JOEZ123456789',22,45000,'2024-11-08',NULL,'2024-11-08',5541234577,'esparza@example.com','esparza123');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plazo`
--

DROP TABLE IF EXISTS `plazo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plazo` (
  `id_plazo` int NOT NULL AUTO_INCREMENT,
  `anios` int NOT NULL,
  PRIMARY KEY (`id_plazo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plazo`
--

LOCK TABLES `plazo` WRITE;
/*!40000 ALTER TABLE `plazo` DISABLE KEYS */;
INSERT INTO `plazo` VALUES (1,10),(2,15),(3,20);
/*!40000 ALTER TABLE `plazo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamo` (
  `id_prestamo` int NOT NULL AUTO_INCREMENT,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `fecha_modificacion` date NOT NULL,
  `cantidad_prestamo` double NOT NULL,
  `pago_mensual` double NOT NULL,
  `tipo_prestamo` int NOT NULL,
  `id_banco` int NOT NULL,
  `cliente_id` int NOT NULL,
  `mensualidades` int NOT NULL,
  PRIMARY KEY (`id_prestamo`),
  KEY `fk_prestamo_tipo_prestamo1_idx` (`tipo_prestamo`),
  KEY `fk_prestamo_banco1_idx` (`id_banco`),
  KEY `fk_prestamo_cliente1_idx` (`cliente_id`),
  CONSTRAINT `fk_prestamo_banco1` FOREIGN KEY (`id_banco`) REFERENCES `banco` (`id_banco`),
  CONSTRAINT `fk_prestamo_cliente1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_prestamo_tipo_prestamo1` FOREIGN KEY (`tipo_prestamo`) REFERENCES `tipo_prestamo` (`id_tipo_prestamo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,'2024-11-09',NULL,'2024-11-09',2000000.7,20643.775072839817,1,1,3,240),(2,'2024-11-09',NULL,'2024-11-09',2000000.789824705,20643.776,2,1,3,0);
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_prestamo`
--

DROP TABLE IF EXISTS `tipo_prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_prestamo` (
  `id_tipo_prestamo` int NOT NULL AUTO_INCREMENT,
  `nombre_prestamo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_prestamo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_prestamo`
--

LOCK TABLES `tipo_prestamo` WRITE;
/*!40000 ALTER TABLE `tipo_prestamo` DISABLE KEYS */;
INSERT INTO `tipo_prestamo` VALUES (1,'casa'),(2,'sueldo');
/*!40000 ALTER TABLE `tipo_prestamo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 11:55:12
