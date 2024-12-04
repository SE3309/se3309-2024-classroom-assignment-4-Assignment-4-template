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
-- Table structure for table `DriverDocuments`
--

DROP TABLE IF EXISTS `DriverDocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DriverDocuments` (
  `Document_ID` int NOT NULL AUTO_INCREMENT,
  `Document_Type` varchar(50) NOT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Driver_ID` int NOT NULL,
  `Dispatcher_ID` int NOT NULL,
  `File_Path` varchar(512) NOT NULL,
  PRIMARY KEY (`Document_ID`),
  KEY `Dispatcher_ID` (`Dispatcher_ID`),
  KEY `Driver_ID` (`Driver_ID`),
  CONSTRAINT `driverdocuments_ibfk_1` FOREIGN KEY (`Dispatcher_ID`) REFERENCES `Dispatcher` (`Dispatcher_ID`),
  CONSTRAINT `driverdocuments_ibfk_2` FOREIGN KEY (`Driver_ID`) REFERENCES `Drivers` (`Driver_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DriverDocuments`
--

LOCK TABLES `DriverDocuments` WRITE;
/*!40000 ALTER TABLE `DriverDocuments` DISABLE KEYS */;
INSERT INTO `DriverDocuments` VALUES (1,'License','2024-11-20 17:56:56',43,1,'/path/to/driver/document/1.pdf'),(2,'Medical Certificate','2024-11-20 17:56:56',52,1,'/path/to/driver/document/2.pdf'),(3,'Medical Certificate','2024-11-20 17:56:56',92,1,'/path/to/driver/document/3.pdf'),(4,'Medical Certificate','2024-11-20 17:56:56',59,1,'/path/to/driver/document/4.pdf'),(5,'Training Record','2024-11-20 17:56:56',63,1,'/path/to/driver/document/5.pdf'),(6,'Medical Certificate','2024-11-20 17:56:56',45,1,'/path/to/driver/document/6.pdf'),(7,'License','2024-11-20 17:56:56',83,1,'/path/to/driver/document/7.pdf'),(8,'License','2024-11-20 17:56:56',103,1,'/path/to/driver/document/8.pdf'),(9,'Medical Certificate','2024-11-20 17:56:56',128,1,'/path/to/driver/document/9.pdf'),(10,'License','2024-11-20 17:56:56',65,1,'/path/to/driver/document/10.pdf'),(11,'Training Record','2024-11-20 17:56:56',120,1,'/path/to/driver/document/11.pdf'),(12,'Medical Certificate','2024-11-20 17:56:56',111,1,'/path/to/driver/document/12.pdf'),(13,'Training Record','2024-11-20 17:56:56',14,1,'/path/to/driver/document/13.pdf'),(14,'Medical Certificate','2024-11-20 17:56:56',149,1,'/path/to/driver/document/14.pdf'),(15,'Training Record','2024-11-20 17:56:56',67,1,'/path/to/driver/document/15.pdf'),(16,'Training Record','2024-11-20 17:56:56',127,1,'/path/to/driver/document/16.pdf'),(17,'License','2024-11-20 17:56:56',131,1,'/path/to/driver/document/17.pdf'),(18,'Medical Certificate','2024-11-20 17:56:56',63,1,'/path/to/driver/document/18.pdf'),(19,'License','2024-11-20 17:56:56',42,1,'/path/to/driver/document/19.pdf'),(20,'Medical Certificate','2024-11-20 17:56:56',107,1,'/path/to/driver/document/20.pdf'),(21,'Medical Certificate','2024-11-20 17:56:56',128,1,'/path/to/driver/document/21.pdf'),(22,'Training Record','2024-11-20 17:56:56',77,1,'/path/to/driver/document/22.pdf'),(23,'License','2024-11-20 17:56:56',134,1,'/path/to/driver/document/23.pdf'),(24,'License','2024-11-20 17:56:56',15,1,'/path/to/driver/document/24.pdf'),(25,'License','2024-11-20 17:56:56',36,1,'/path/to/driver/document/25.pdf'),(26,'License','2024-11-20 17:56:56',52,1,'/path/to/driver/document/26.pdf'),(27,'Medical Certificate','2024-11-20 17:56:56',93,1,'/path/to/driver/document/27.pdf'),(28,'License','2024-11-20 17:56:56',124,1,'/path/to/driver/document/28.pdf'),(29,'Training Record','2024-11-20 17:56:56',115,1,'/path/to/driver/document/29.pdf'),(30,'Training Record','2024-11-20 17:56:56',86,1,'/path/to/driver/document/30.pdf'),(31,'License','2024-11-20 17:56:56',27,1,'/path/to/driver/document/31.pdf'),(32,'Medical Certificate','2024-11-20 17:56:56',74,1,'/path/to/driver/document/32.pdf'),(33,'Training Record','2024-11-20 17:56:56',110,1,'/path/to/driver/document/33.pdf'),(34,'Training Record','2024-11-20 17:56:56',66,1,'/path/to/driver/document/34.pdf'),(35,'License','2024-11-20 17:56:56',146,1,'/path/to/driver/document/35.pdf'),(36,'License','2024-11-20 17:56:56',34,1,'/path/to/driver/document/36.pdf'),(37,'Training Record','2024-11-20 17:56:56',121,1,'/path/to/driver/document/37.pdf'),(38,'License','2024-11-20 17:56:56',84,1,'/path/to/driver/document/38.pdf'),(39,'License','2024-11-20 17:56:56',114,1,'/path/to/driver/document/39.pdf'),(40,'Medical Certificate','2024-11-20 17:56:56',126,1,'/path/to/driver/document/40.pdf'),(41,'License','2024-11-20 17:56:56',61,1,'/path/to/driver/document/41.pdf'),(42,'Medical Certificate','2024-11-20 17:56:56',20,1,'/path/to/driver/document/42.pdf'),(43,'Medical Certificate','2024-11-20 17:56:56',103,1,'/path/to/driver/document/43.pdf'),(44,'License','2024-11-20 17:56:56',35,1,'/path/to/driver/document/44.pdf'),(45,'License','2024-11-20 17:56:56',116,1,'/path/to/driver/document/45.pdf'),(46,'License','2024-11-20 17:56:56',75,1,'/path/to/driver/document/46.pdf'),(47,'License','2024-11-20 17:56:56',71,1,'/path/to/driver/document/47.pdf'),(48,'Medical Certificate','2024-11-20 17:56:56',93,1,'/path/to/driver/document/48.pdf'),(49,'License','2024-11-20 17:56:56',149,1,'/path/to/driver/document/49.pdf'),(50,'License','2024-11-20 17:56:56',13,1,'/path/to/driver/document/50.pdf');
/*!40000 ALTER TABLE `DriverDocuments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-24 23:21:16
