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
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `Client_ID` int NOT NULL AUTO_INCREMENT,
  `F_name` varchar(50) NOT NULL,
  `L_name` varchar(50) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Phone_No` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Client_ID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Phone_No` (`Phone_No`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clients`
--

LOCK TABLES `Clients` WRITE;
/*!40000 ALTER TABLE `Clients` DISABLE KEYS */;
INSERT INTO `Clients` VALUES (1,'Lisa','Bowman','douglas77@example.net','9614387943'),(2,'Brent','Anderson','logandalton@example.org','2313846397'),(3,'Jennifer','Nelson','lisatorres@example.com','8359201067'),(4,'Dan','Brown','ryancampbell@example.net','4567547153'),(5,'Jake','Gardner','suzanne99@example.net','5846262560'),(6,'Christopher','Miller','vmunoz@example.org','9326074827'),(7,'James','Williams','charles58@example.com','5570493511'),(8,'Robert','Robinson','michelle57@example.org','1658418696'),(9,'Robert','Adkins','browngloria@example.com','3243260535'),(10,'Andrew','Brown','ywhite@example.com','1064192952'),(11,'Courtney','Turner','dsmith@example.org','5829727779'),(12,'Amanda','Roberts','xcarpenter@example.org','0794985496'),(13,'Hannah','Daniel','haneywilliam@example.net','3218208387'),(14,'Jasmine','Bates','jamesvega@example.com','1769616197'),(15,'Nathan','Lyons','letonya@example.net','5628193888'),(16,'Albert','Duncan','kimcharles@example.org','5352704614'),(17,'David','Hernandez','ralvarez@example.net','0953292445'),(18,'Stephen','Oneill','donald67@example.com','2892736623'),(19,'Andrea','Jennings','gallen@example.net','9149780150'),(20,'Joseph','Stuart','bparsons@example.com','4067885005'),(21,'Edward','Romero','danielreeves@example.com','1668132920'),(22,'Steven','Manning','coreyfields@example.org','2675264457'),(23,'Ann','Hernandez','michaelmcfarland@example.org','9849239243'),(24,'Donald','Holland','swatson@example.com','7608633775'),(25,'Charles','Rios','xolsen@example.com','3372414532'),(26,'Thomas','Castro','youngjacob@example.com','2117277244'),(27,'Jody','Baker','christophermartinez@example.org','5214741198'),(28,'Larry','Chavez','odavis@example.org','9275838329'),(29,'Kenneth','Kelly','terri61@example.net','9074927842'),(30,'Cory','Garcia','martinezrobert@example.net','1990303308'),(31,'Larry','Floyd','bellpamela@example.org','6354929583'),(32,'Kathy','Solomon','tracey93@example.com','1415530751'),(33,'Brandy','Perry','bethmason@example.com','3849899824'),(34,'Dana','Miller','reneepatel@example.org','8248402048'),(35,'Gabrielle','Brewer','walter90@example.net','6693220141'),(36,'Philip','Compton','sherrysmith@example.org','6007358686'),(37,'Vincent','Sandoval','brookskellie@example.com','8011128083'),(38,'George','Perkins','qcervantes@example.org','9427925337'),(39,'Tina','Moore','andrethompson@example.net','4187394685'),(40,'Timothy','Murray','awheeler@example.com','0785953881'),(41,'Benjamin','Smith','foleygina@example.org','2387342325'),(42,'Miranda','Russo','gonzalezdanielle@example.com','5347799661'),(43,'Ashley','Giles','gadams@example.com','2640892320'),(44,'Jeffery','Jacobs','brentconner@example.net','4350641070'),(45,'Daniel','Gomez','jonaguilar@example.org','3666141351'),(46,'Rebecca','Harris','jordan33@example.net','8720848922'),(47,'Erik','Thomas','gordonbecky@example.com','2436398875'),(48,'Desiree','Evans','anthonydixon@example.com','1160275142'),(49,'Nicholas','Christensen','shawdawn@example.com','8886477779'),(50,'Timothy','Hickman','wandaparker@example.org','0399632407');
/*!40000 ALTER TABLE `Clients` ENABLE KEYS */;
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
