-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: se3309
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `airline`
--

DROP TABLE IF EXISTS `airline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airline` (
  `airlineID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `countryOfOrigin` varchar(50) NOT NULL,
  PRIMARY KEY (`airlineID`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airline`
--

LOCK TABLES `airline` WRITE;
/*!40000 ALTER TABLE `airline` DISABLE KEYS */;
INSERT INTO `airline` VALUES (1,'Gonzalez Group','Canada'),(2,'Brown and Sons','France'),(3,'Perkins-Hall','South Korea'),(4,'Bryant-Young','United States'),(5,'Wallace, Burns and Sanders','Mexico'),(6,'Rubio Group','South Africa'),(7,'Hood, Avila and Johnson','United Kingdom'),(8,'Davis, Carr and Smith','France'),(9,'Garcia Group','Italy'),(10,'Sandoval Ltd','Australia'),(11,'Swanson PLC','United Kingdom'),(12,'Hoffman LLC','India'),(13,'Odom Group','Japan'),(14,'Mckinney PLC','Italy'),(15,'Weber Group','Germany'),(16,'Ayala PLC','United States'),(17,'Parrish-Nguyen','France'),(18,'Crawford Ltd','Japan'),(19,'Baird, Thompson and Morgan','United Kingdom'),(20,'Baker-Green','Germany'),(21,'Young, Wilson and Young','Australia'),(22,'Gallegos-Clark','Brazil'),(23,'Reed-Brown','Canada'),(24,'Evans-Wiggins','Canada'),(25,'Wood LLC','France'),(26,'Miller, Vasquez and Walsh','China'),(27,'Ramos LLC','Mexico'),(28,'Newman-Rogers','China'),(29,'Lawson and Sons','Australia'),(30,'Morris, Gardner and Diaz','India'),(31,'Stewart, Wells and Hill','United States'),(32,'Smith, Smith and Goodman','South Korea'),(33,'Williams, Garcia and Chavez','United States'),(34,'Barker PLC','United Kingdom'),(35,'Brewer, Singleton and Ballard','Germany'),(36,'Mills Ltd','Brazil'),(37,'Melton-White','United States'),(38,'Bryan Group','Japan'),(39,'Stuart, Castaneda and Powers','Brazil'),(40,'Smith Inc','India'),(41,'Adams-Suarez','France'),(42,'Church, Nash and Thomas','Germany'),(43,'Smith Group','India'),(44,'Brown LLC','United Kingdom'),(45,'Harmon, Rubio and Decker','Brazil'),(46,'Nguyen-Proctor','Japan'),(47,'Long Inc','India'),(48,'Horn, Walter and Jenkins','Japan'),(49,'Mccoy, Medina and Johnson','Australia'),(50,'Smith-Romero','France'),(51,'Medina-Johnson','Mexico'),(52,'Brown, Ritter and Williams','Australia'),(53,'Atkins-Clark','Brazil'),(54,'Wood, Hammond and Jenkins','Mexico'),(55,'Mcguire-Ross','Germany'),(56,'Rice, Marshall and Ramsey','Mexico'),(57,'Spencer-Brown','Japan'),(58,'Peterson-White','United States'),(59,'Long-Sharp','Brazil'),(60,'Murphy-Russell','South Korea'),(61,'Lawson PLC','Italy'),(62,'Farmer Ltd','France'),(63,'Wilson, Mcbride and Butler','Japan'),(64,'White, Parker and Allen','Germany'),(65,'Mendoza, White and Lee','Germany'),(66,'Dillon-Baker','South Africa'),(67,'Graves-Lamb','South Korea'),(68,'Boyd Inc','Canada'),(69,'Huffman-Kelly','Australia'),(70,'Wright-Lopez','Mexico'),(71,'Smith-Grant','France'),(72,'Thompson PLC','South Africa'),(73,'Stone-Barker','China'),(74,'Williams-Williams','France'),(75,'Bush-Fuentes','South Africa'),(76,'Holland Inc','China'),(77,'Williamson, Brown and Shaw','Germany'),(78,'Dickerson, Krause and King','Mexico'),(79,'Jones-Rivera','China'),(80,'Johnson and Sons','France'),(81,'Garza-Clark','France'),(82,'Kennedy-Johnson','China'),(83,'Jones, Joyce and Murphy','South Korea'),(84,'Mcdonald, Campbell and Austin','Germany'),(85,'Morris-Lucas','Brazil'),(86,'Williams, Holt and Cannon','South Korea'),(87,'Dunlap Group','Mexico'),(88,'Barnes-Edwards','United States'),(89,'Day-Davis','Germany'),(90,'Parker-Santana','United States'),(91,'Johnson, Chen and Moreno','France'),(92,'House Inc','France'),(93,'Fisher-Guzman','Australia'),(94,'Miller PLC','China'),(95,'Williams, Spencer and Sweeney','Germany'),(96,'Fleming and Sons','Australia'),(97,'Gray-Cox','Italy'),(98,'Ortiz Inc','South Korea'),(99,'Alexander PLC','Germany'),(100,'Patel, Joseph and Rosales','France'),(101,'White Ltd','France'),(102,'Baker Ltd','Mexico'),(103,'Jenkins, Romero and Smith','South Africa'),(104,'Garcia, Richards and Ramirez','France'),(105,'Owens, Arias and Green','United Kingdom'),(106,'Doyle Ltd','France'),(107,'Fernandez LLC','Brazil'),(108,'Lee, Cook and Dixon','United States'),(109,'Brown, Branch and Miller','Germany'),(110,'Decker and Sons','South Africa'),(111,'Perkins PLC','United States'),(112,'Macdonald and Sons','China'),(113,'Curtis-Terrell','United States'),(114,'Miller, Sosa and Shepherd','Italy'),(115,'Doyle, Jacobson and Richardson','South Africa'),(116,'Acevedo-Ramsey','South Africa'),(117,'Villegas-Miller','Germany'),(118,'Hammond, Sampson and Green','Australia'),(119,'Garza Ltd','United Kingdom'),(120,'Perry PLC','Mexico'),(121,'Mayer, Brown and Morton','France'),(122,'Wilson-Lamb','Japan'),(123,'Lambert-Martin','India'),(124,'Chambers, Anderson and Chavez','Japan'),(125,'Price, Butler and Hogan','China'),(126,'Allison PLC','Japan'),(127,'Mccoy and Sons','Mexico'),(128,'Miller Ltd','Italy'),(129,'Rios Inc','France'),(130,'Buchanan, West and Hobbs','South Korea'),(131,'Church, Barker and Hodge','China'),(132,'Bass-Butler','Canada'),(133,'Huff-Little','Australia'),(134,'Parker-Wilson','United Kingdom'),(135,'Hudson and Sons','Italy'),(136,'Reed Inc','Brazil'),(137,'James PLC','Italy'),(138,'Jones-Gould','Mexico'),(139,'Copeland, Wright and Morgan','South Korea'),(140,'Haas-Adams','Germany'),(141,'Sullivan, Long and Williams','France'),(142,'Wade, Wolfe and Clark','Mexico'),(143,'Sullivan-Stanley','Germany'),(144,'Martin-Sutton','Brazil'),(145,'Jones, Hoffman and King','China'),(146,'Fisher-White','Mexico'),(147,'Roach-Summers','South Africa'),(148,'Johnson, Bishop and Moss','United States'),(149,'Johnson-Branch','United Kingdom'),(150,'Guerrero-Wagner','United States'),(151,'Sims-Ortiz','South Korea'),(152,'Austin Ltd','Brazil'),(153,'Spencer, Rodriguez and Greer','South Africa'),(154,'Clark, Murray and Valdez','China'),(155,'Ward-Smith','Canada'),(156,'Price, Marquez and Murphy','Mexico'),(157,'Huang, Norris and Johnson','South Africa'),(158,'Smith LLC','Italy'),(159,'Weber-Morris','Canada'),(160,'Taylor-Johnson','Brazil'),(161,'Williams-Lewis','United States'),(162,'Rodriguez Ltd','France'),(163,'Montgomery-Nguyen','Germany'),(164,'Acosta and Sons','Italy'),(165,'Hill Inc','Japan'),(166,'Hamilton and Sons','South Korea'),(167,'Noble and Sons','South Africa'),(168,'Reeves Ltd','Brazil'),(169,'Armstrong-Williams','Mexico'),(170,'White Group','Brazil'),(171,'Miller PLC','Germany'),(172,'Baker LLC','South Africa'),(173,'Reese Ltd','Italy'),(174,'Reese Ltd','China'),(175,'Nichols, Santiago and Michael','United Kingdom'),(176,'Williams-George','South Africa'),(177,'Martinez Inc','Germany'),(178,'Ward PLC','Australia'),(179,'Roberson-Hernandez','South Korea'),(180,'Harris Group','Japan'),(181,'Kelley PLC','United States'),(182,'Rogers, Owens and Hobbs','Brazil'),(183,'Vasquez-Ramirez','Italy'),(184,'Jones, Sims and Larsen','India'),(185,'Baker Ltd','Germany'),(186,'Lee LLC','Australia'),(187,'Bradley, Thompson and Campos','Australia'),(188,'Price-Malone','Australia'),(189,'Brown PLC','Canada'),(190,'Brady LLC','Canada'),(191,'Evans-Garrison','Italy'),(192,'Krause Group','India'),(193,'Cross Group','United Kingdom'),(194,'Silva Ltd','Australia'),(195,'Walker, Ayala and Christian','Brazil'),(196,'Graham-Powell','France'),(197,'Conner-Goodwin','South Korea'),(198,'Smith-Smith','United Kingdom'),(199,'Schmitt, Little and Jimenez','United States'),(200,'Bolton-Thompson','Japan');
/*!40000 ALTER TABLE `airline` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 21:04:38
