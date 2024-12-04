-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: dispatcher_management_system
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `TruckDocuments`
--

DROP TABLE IF EXISTS `TruckDocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TruckDocuments` (
  `Document_ID` int NOT NULL AUTO_INCREMENT,
  `Document_Type` varchar(50) DEFAULT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Truck_ID` int DEFAULT NULL,
  `Dispatcher_ID` int DEFAULT NULL,
  `File_Path` varchar(255) NOT NULL,
  PRIMARY KEY (`Document_ID`),
  KEY `Dispatcher_ID` (`Dispatcher_ID`),
  KEY `Truck_ID` (`Truck_ID`),
  CONSTRAINT `truckdocuments_ibfk_1` FOREIGN KEY (`Dispatcher_ID`) REFERENCES `Dispatcher` (`Dispatcher_ID`),
  CONSTRAINT `truckdocuments_ibfk_2` FOREIGN KEY (`Truck_ID`) REFERENCES `Trucks` (`Truck_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TruckDocuments`
--

LOCK TABLES `TruckDocuments` WRITE;
/*!40000 ALTER TABLE `TruckDocuments` DISABLE KEYS */;
INSERT INTO `TruckDocuments` VALUES (1,'Registration','2024-11-20 17:56:56',482,1,'/path/to/truck/document/1.pdf'),(2,'Insurance','2024-11-20 17:56:56',4,1,'/path/to/truck/document/2.pdf'),(3,'Registration','2024-11-20 17:56:56',29,1,'/path/to/truck/document/3.pdf'),(4,'Insurance','2024-11-20 17:56:56',28,1,'/path/to/truck/document/4.pdf'),(5,'Insurance','2024-11-20 17:56:56',499,1,'/path/to/truck/document/5.pdf'),(6,'Maintenance Record','2024-11-20 17:56:56',25,1,'/path/to/truck/document/6.pdf'),(7,'Maintenance Record','2024-11-20 17:56:56',124,1,'/path/to/truck/document/7.pdf'),(8,'Insurance','2024-11-20 17:56:56',284,1,'/path/to/truck/document/8.pdf'),(9,'Maintenance Record','2024-11-20 17:56:56',92,1,'/path/to/truck/document/9.pdf'),(10,'Insurance','2024-11-20 17:56:56',189,1,'/path/to/truck/document/10.pdf'),(11,'Registration','2024-11-20 17:56:56',411,1,'/path/to/truck/document/11.pdf'),(12,'Maintenance Record','2024-11-20 17:56:56',4,1,'/path/to/truck/document/12.pdf'),(13,'Insurance','2024-11-20 17:56:56',466,1,'/path/to/truck/document/13.pdf'),(14,'Insurance','2024-11-20 17:56:56',91,1,'/path/to/truck/document/14.pdf'),(15,'Insurance','2024-11-20 17:56:56',59,1,'/path/to/truck/document/15.pdf'),(16,'Registration','2024-11-20 17:56:56',147,1,'/path/to/truck/document/16.pdf'),(17,'Registration','2024-11-20 17:56:56',475,1,'/path/to/truck/document/17.pdf'),(18,'Registration','2024-11-20 17:56:56',99,1,'/path/to/truck/document/18.pdf'),(19,'Insurance','2024-11-20 17:56:56',283,1,'/path/to/truck/document/19.pdf'),(20,'Maintenance Record','2024-11-20 17:56:56',298,1,'/path/to/truck/document/20.pdf'),(21,'Registration','2024-11-20 17:56:56',481,1,'/path/to/truck/document/21.pdf'),(22,'Registration','2024-11-20 17:56:56',278,1,'/path/to/truck/document/22.pdf'),(23,'Insurance','2024-11-20 17:56:56',377,1,'/path/to/truck/document/23.pdf'),(24,'Insurance','2024-11-20 17:56:56',261,1,'/path/to/truck/document/24.pdf'),(25,'Registration','2024-11-20 17:56:56',346,1,'/path/to/truck/document/25.pdf'),(26,'Maintenance Record','2024-11-20 17:56:56',292,1,'/path/to/truck/document/26.pdf'),(27,'Maintenance Record','2024-11-20 17:56:56',473,1,'/path/to/truck/document/27.pdf'),(28,'Insurance','2024-11-20 17:56:56',203,1,'/path/to/truck/document/28.pdf'),(29,'Registration','2024-11-20 17:56:56',250,1,'/path/to/truck/document/29.pdf'),(30,'Maintenance Record','2024-11-20 17:56:56',400,1,'/path/to/truck/document/30.pdf'),(31,'Insurance','2024-11-20 17:56:56',280,1,'/path/to/truck/document/31.pdf'),(32,'Insurance','2024-11-20 17:56:56',354,1,'/path/to/truck/document/32.pdf'),(33,'Maintenance Record','2024-11-20 17:56:56',125,1,'/path/to/truck/document/33.pdf'),(34,'Insurance','2024-11-20 17:56:56',499,1,'/path/to/truck/document/34.pdf'),(35,'Registration','2024-11-20 17:56:56',310,1,'/path/to/truck/document/35.pdf'),(36,'Registration','2024-11-20 17:56:56',139,1,'/path/to/truck/document/36.pdf'),(37,'Registration','2024-11-20 17:56:56',448,1,'/path/to/truck/document/37.pdf'),(38,'Maintenance Record','2024-11-20 17:56:56',257,1,'/path/to/truck/document/38.pdf'),(39,'Maintenance Record','2024-11-20 17:56:56',386,1,'/path/to/truck/document/39.pdf'),(40,'Insurance','2024-11-20 17:56:56',189,1,'/path/to/truck/document/40.pdf'),(41,'Insurance','2024-11-20 17:56:56',49,1,'/path/to/truck/document/41.pdf'),(42,'Insurance','2024-11-20 17:56:56',252,1,'/path/to/truck/document/42.pdf'),(43,'Maintenance Record','2024-11-20 17:56:56',303,1,'/path/to/truck/document/43.pdf'),(44,'Insurance','2024-11-20 17:56:56',268,1,'/path/to/truck/document/44.pdf'),(45,'Registration','2024-11-20 17:56:56',341,1,'/path/to/truck/document/45.pdf'),(46,'Insurance','2024-11-20 17:56:56',427,1,'/path/to/truck/document/46.pdf'),(47,'Registration','2024-11-20 17:56:56',28,1,'/path/to/truck/document/47.pdf'),(48,'Insurance','2024-11-20 17:56:56',90,1,'/path/to/truck/document/48.pdf'),(49,'Registration','2024-11-20 17:56:56',418,1,'/path/to/truck/document/49.pdf'),(50,'Insurance','2024-11-20 17:56:56',202,1,'/path/to/truck/document/50.pdf');
/*!40000 ALTER TABLE `TruckDocuments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-24 23:21:17
