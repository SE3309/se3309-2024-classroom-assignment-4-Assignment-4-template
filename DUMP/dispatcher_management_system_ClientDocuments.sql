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
-- Table structure for table `ClientDocuments`
--

DROP TABLE IF EXISTS `ClientDocuments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientDocuments` (
  `Document_ID` int NOT NULL AUTO_INCREMENT,
  `Document_Type` varchar(50) DEFAULT NULL,
  `Created_At` datetime DEFAULT CURRENT_TIMESTAMP,
  `Job_ID` int DEFAULT NULL,
  `Dispatcher_ID` int DEFAULT NULL,
  `File_Path` varchar(255) NOT NULL,
  PRIMARY KEY (`Document_ID`),
  KEY `Dispatcher_ID` (`Dispatcher_ID`),
  KEY `Job_ID` (`Job_ID`),
  CONSTRAINT `clientdocuments_ibfk_1` FOREIGN KEY (`Dispatcher_ID`) REFERENCES `Dispatcher` (`Dispatcher_ID`),
  CONSTRAINT `clientdocuments_ibfk_2` FOREIGN KEY (`Job_ID`) REFERENCES `Jobs` (`Job_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientDocuments`
--

LOCK TABLES `ClientDocuments` WRITE;
/*!40000 ALTER TABLE `ClientDocuments` DISABLE KEYS */;
INSERT INTO `ClientDocuments` VALUES (1,'Contract','2024-11-20 17:56:56',2467,1,'/path/to/client/document/1.pdf'),(2,'Agreement','2024-11-20 17:56:56',1726,1,'/path/to/client/document/2.pdf'),(3,'Invoice','2024-11-20 17:56:56',171,1,'/path/to/client/document/3.pdf'),(4,'Contract','2024-11-20 17:56:56',2202,1,'/path/to/client/document/4.pdf'),(5,'Agreement','2024-11-20 17:56:56',717,1,'/path/to/client/document/5.pdf'),(6,'Invoice','2024-11-20 17:56:56',879,1,'/path/to/client/document/6.pdf'),(7,'Contract','2024-11-20 17:56:56',1759,1,'/path/to/client/document/7.pdf'),(8,'Agreement','2024-11-20 17:56:56',911,1,'/path/to/client/document/8.pdf'),(9,'Contract','2024-11-20 17:56:56',2601,1,'/path/to/client/document/9.pdf'),(10,'Agreement','2024-11-20 17:56:56',260,1,'/path/to/client/document/10.pdf'),(11,'Invoice','2024-11-20 17:56:56',373,1,'/path/to/client/document/11.pdf'),(12,'Agreement','2024-11-20 17:56:56',1819,1,'/path/to/client/document/12.pdf'),(13,'Agreement','2024-11-20 17:56:56',2685,1,'/path/to/client/document/13.pdf'),(14,'Contract','2024-11-20 17:56:56',1546,1,'/path/to/client/document/14.pdf'),(15,'Agreement','2024-11-20 17:56:56',1016,1,'/path/to/client/document/15.pdf'),(16,'Agreement','2024-11-20 17:56:56',1192,1,'/path/to/client/document/16.pdf'),(17,'Agreement','2024-11-20 17:56:56',2532,1,'/path/to/client/document/17.pdf'),(18,'Contract','2024-11-20 17:56:56',1665,1,'/path/to/client/document/18.pdf'),(19,'Invoice','2024-11-20 17:56:56',1439,1,'/path/to/client/document/19.pdf'),(20,'Contract','2024-11-20 17:56:56',1228,1,'/path/to/client/document/20.pdf'),(21,'Agreement','2024-11-20 17:56:56',2814,1,'/path/to/client/document/21.pdf'),(22,'Invoice','2024-11-20 17:56:56',1667,1,'/path/to/client/document/22.pdf'),(23,'Invoice','2024-11-20 17:56:56',2624,1,'/path/to/client/document/23.pdf'),(24,'Contract','2024-11-20 17:56:56',2891,1,'/path/to/client/document/24.pdf'),(25,'Agreement','2024-11-20 17:56:56',444,1,'/path/to/client/document/25.pdf'),(26,'Agreement','2024-11-20 17:56:56',1173,1,'/path/to/client/document/26.pdf'),(27,'Agreement','2024-11-20 17:56:56',604,1,'/path/to/client/document/27.pdf'),(28,'Invoice','2024-11-20 17:56:56',2139,1,'/path/to/client/document/28.pdf'),(29,'Agreement','2024-11-20 17:56:56',1390,1,'/path/to/client/document/29.pdf'),(30,'Contract','2024-11-20 17:56:56',1049,1,'/path/to/client/document/30.pdf'),(31,'Invoice','2024-11-20 17:56:56',2443,1,'/path/to/client/document/31.pdf'),(32,'Agreement','2024-11-20 17:56:56',265,1,'/path/to/client/document/32.pdf'),(33,'Agreement','2024-11-20 17:56:56',765,1,'/path/to/client/document/33.pdf'),(34,'Invoice','2024-11-20 17:56:56',1948,1,'/path/to/client/document/34.pdf'),(35,'Invoice','2024-11-20 17:56:56',327,1,'/path/to/client/document/35.pdf'),(36,'Contract','2024-11-20 17:56:56',2718,1,'/path/to/client/document/36.pdf'),(37,'Invoice','2024-11-20 17:56:56',2348,1,'/path/to/client/document/37.pdf'),(38,'Contract','2024-11-20 17:56:56',522,1,'/path/to/client/document/38.pdf'),(39,'Agreement','2024-11-20 17:56:56',780,1,'/path/to/client/document/39.pdf'),(40,'Invoice','2024-11-20 17:56:56',1334,1,'/path/to/client/document/40.pdf'),(41,'Contract','2024-11-20 17:56:56',860,1,'/path/to/client/document/41.pdf'),(42,'Contract','2024-11-20 17:56:56',862,1,'/path/to/client/document/42.pdf'),(43,'Invoice','2024-11-20 17:56:56',2331,1,'/path/to/client/document/43.pdf'),(44,'Contract','2024-11-20 17:56:56',103,1,'/path/to/client/document/44.pdf'),(45,'Agreement','2024-11-20 17:56:56',1691,1,'/path/to/client/document/45.pdf'),(46,'Contract','2024-11-20 17:56:56',133,1,'/path/to/client/document/46.pdf'),(47,'Contract','2024-11-20 17:56:56',320,1,'/path/to/client/document/47.pdf'),(48,'Contract','2024-11-20 17:56:56',284,1,'/path/to/client/document/48.pdf'),(49,'Invoice','2024-11-20 17:56:56',1286,1,'/path/to/client/document/49.pdf'),(50,'Contract','2024-11-20 17:56:56',2940,1,'/path/to/client/document/50.pdf');
/*!40000 ALTER TABLE `ClientDocuments` ENABLE KEYS */;
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
