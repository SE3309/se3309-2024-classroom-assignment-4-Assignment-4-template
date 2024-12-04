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
-- Table structure for table `Drivers`
--

DROP TABLE IF EXISTS `Drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Drivers` (
  `Driver_ID` int NOT NULL AUTO_INCREMENT,
  `License_Type` varchar(50) NOT NULL,
  `F_Name` varchar(50) NOT NULL,
  `L_Name` varchar(50) NOT NULL,
  `Availability` tinyint(1) NOT NULL,
  `Phone_No` varchar(20) NOT NULL,
  `Dispatcher_ID` int NOT NULL,
  PRIMARY KEY (`Driver_ID`),
  KEY `drivers_ibfk_1` (`Dispatcher_ID`),
  CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`Dispatcher_ID`) REFERENCES `Dispatcher` (`Dispatcher_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Drivers`
--

LOCK TABLES `Drivers` WRITE;
/*!40000 ALTER TABLE `Drivers` DISABLE KEYS */;
INSERT INTO `Drivers` VALUES (1,'Class B','Samantha','Hinton',0,'0695535607',1),(2,'Class B','Dana','Weber',0,'6177295330',1),(3,'Class A','Stefanie','Hayes',0,'7964035181',1),(4,'Class D','William','Johnson',0,'7071532349',1),(5,'Class E','Robert','Ho',0,'1479155425',1),(6,'Class E','Wesley','Perry',0,'8015285622',1),(7,'Class E','Denise','Richmond',0,'7043535243',1),(8,'Class B','Michael','Strong',0,'0841957937',1),(9,'Class C','Gloria','King',0,'7879460397',1),(10,'Class A','Bradley','Brown',0,'3824976215',1),(11,'Class E','Jean','Cordova',0,'4076726462',1),(12,'Class D','Jimmy','Miller',0,'8699603936',1),(13,'Class B','Ruben','Parker',0,'5088076798',1),(14,'Class B','Michael','Davis',0,'9695485764',1),(15,'Class C','Amber','Mcpherson',0,'8350119039',1),(16,'Class E','Howard','Jennings',0,'2320868770',1),(17,'Class D','James','Reid',0,'9731435033',1),(18,'Class E','Amy','Velez',0,'4636555121',1),(19,'Class C','Christopher','Elliott',0,'6608334906',1),(20,'Class D','Tommy','Mann',0,'3963601431',1),(21,'Class C','Ryan','Gomez',0,'6206269195',1),(22,'Class E','Dana','Fry',0,'2237119061',1),(23,'Class A','John','Hartman',0,'3658590657',1),(24,'Class B','Maxwell','Graves',0,'1543881199',1),(25,'Class E','Victoria','Torres',0,'1364635626',1),(26,'Class C','Joseph','Mcbride',0,'7648520642',1),(27,'Class A','Thomas','Norton',0,'8372524152',1),(28,'Class C','William','Bowen',0,'4183334628',1),(29,'Class E','Cynthia','Thomas',0,'0515566907',1),(30,'Class A','Patrick','Martin',0,'5142695640',1),(31,'Class C','Michael','Butler',0,'9656303863',1),(32,'Class A','Kayla','Phillips',0,'2040640622',1),(33,'Class A','Nicole','Hernandez',0,'5196031225',1),(34,'Class C','Lisa','Jones',0,'6424018894',1),(35,'Class C','Bethany','Stone',0,'2403043836',1),(36,'Class B','Ryan','Martinez',0,'4106056929',1),(37,'Class A','Erin','Johnson',0,'0601212237',1),(38,'Class A','Carol','Taylor',0,'6662241214',1),(39,'Class D','Sara','Ford',0,'2717727171',1),(40,'Class C','Cynthia','Douglas',0,'2836450093',1),(41,'Class E','Tony','Collins',0,'9484262167',1),(42,'Class D','Joseph','Wright',0,'7296061544',1),(43,'Class B','Robert','Flores',0,'6053110129',1),(44,'Class E','Samuel','James',0,'9202791597',1),(45,'Class E','Sheila','Allen',0,'9948353818',1),(46,'Class E','James','Myers',0,'0168715320',1),(47,'Class B','Catherine','Salazar',0,'7871408927',1),(48,'Class A','Courtney','Conley',0,'1845508604',1),(49,'Class B','Christopher','Rodriguez',0,'0586950598',1),(50,'Class C','Christian','Mitchell',0,'4454370539',1),(51,'Class B','Dennis','Glenn',0,'9134712904',1),(52,'Class C','Danielle','Adkins',0,'4167217925',1),(53,'Class C','Richard','Smith',0,'4418616031',1),(54,'Class C','Ethan','Warren',0,'8631137406',1),(55,'Class B','Robert','Mccarthy',0,'2176141472',1),(56,'Class E','Michael','Long',0,'9172252249',1),(57,'Class B','Eric','Jones',0,'9712318663',1),(58,'Class B','Charles','Wilkinson',0,'5876784351',1),(59,'Class D','Amy','Ruiz',0,'7066857237',1),(60,'Class B','Cindy','Snyder',0,'9747006116',1),(61,'Class D','Misty','Bishop',0,'3423499734',1),(62,'Class E','Matthew','Ward',0,'3377837793',1),(63,'Class C','Amanda','Hernandez',0,'1217639145',1),(64,'Class E','Joseph','Sosa',0,'5296961791',1),(65,'Class D','Joanna','Nguyen',0,'3800682521',1),(66,'Class D','Jason','Brown',0,'1739703805',1),(67,'Class A','John','Robinson',0,'7658054981',1),(68,'Class C','Debbie','Rodriguez',0,'5622126099',1),(69,'Class A','Dylan','Klein',0,'7973106316',1),(70,'Class E','Pamela','Buck',0,'5029551677',1),(71,'Class D','Robert','Hansen',0,'5141152353',1),(72,'Class D','Christopher','Robinson',0,'7462284118',1),(73,'Class D','James','Barnes',0,'7434794101',1),(74,'Class A','James','Lee',0,'9135389916',1),(75,'Class C','Nichole','Stevenson',0,'1785881354',1),(76,'Class A','Laura','Wilkinson',0,'3530019677',1),(77,'Class E','Mark','Harris',0,'7380631825',1),(78,'Class C','Tyler','Steele',0,'7042111623',1),(79,'Class D','Benjamin','Carney',0,'3866251802',1),(80,'Class C','Morgan','Marshall',0,'2677128486',1),(81,'Class B','James','Gross',0,'1756739890',1),(82,'Class A','Jonathan','Davenport',0,'6527675144',1),(83,'Class A','Jeremy','Brooks',0,'6435527491',1),(84,'Class A','Daniel','Arias',0,'1519161862',1),(85,'Class C','Kimberly','Pham',0,'7060324864',1),(86,'Class E','Marcus','Williams',0,'2399149541',1),(87,'Class E','John','Vargas',0,'7276634650',1),(88,'Class A','Karen','Day',0,'3379331947',1),(89,'Class B','Melvin','Gonzalez',0,'4783708673',1),(90,'Class A','Christopher','Rhodes',0,'6734966381',1),(91,'Class E','Craig','Robinson',0,'9373766773',1),(92,'Class B','Jon','Washington',0,'4969740818',1),(93,'Class E','Laura','Benson',0,'9896974807',1),(94,'Class D','Richard','Lee',0,'9444563911',1),(95,'Class C','Maria','Martinez',0,'6554617638',1),(96,'Class A','Candice','Willis',0,'1401131603',1),(97,'Class C','Timothy','Butler',0,'1367567702',1),(98,'Class D','Kelly','Black',0,'4669019485',1),(99,'Class E','Crystal','Sloan',0,'0866988707',1),(100,'Class C','Benjamin','Gregory',0,'4955043339',1),(101,'Class C','Charlotte','Kaufman',0,'4960326255',1),(102,'Class B','Desiree','Stevens',0,'6137282544',1),(103,'Class A','William','Clay',0,'8028461884',1),(104,'Class B','Jessica','Mcintyre',0,'3259662629',1),(105,'Class E','Debbie','Vang',0,'0561716959',1),(106,'Class A','Miguel','Gonzales',0,'1028874267',1),(107,'Class E','Logan','Meyer',0,'1552492904',1),(108,'Class A','Toni','Lewis',0,'6129155948',1),(109,'Class A','Frank','Bowen',0,'1400111852',1),(110,'Class B','Heidi','Perez',0,'8259300018',1),(111,'Class E','Debbie','Gonzalez',0,'0130584718',1),(112,'Class C','Carol','Diaz',0,'1242279865',1),(113,'Class E','Peter','Jordan',0,'1323714678',1),(114,'Class E','Tom','Weeks',0,'7720146003',1),(115,'Class C','Jessica','Mathews',0,'5716381329',1),(116,'Class A','Emily','Brooks',0,'3757999677',1),(117,'Class E','Janice','Sandoval',0,'9026327429',1),(118,'Class A','Lori','Wright',0,'8573692401',1),(119,'Class D','Ariel','Summers',0,'8762896104',1),(120,'Class C','Jennifer','Booth',0,'3110888681',1),(121,'Class C','Amber','Vincent',0,'8784108397',1),(122,'Class C','Steven','Jordan',0,'8063374370',1),(123,'Class C','Anna','Morse',0,'1387326353',1),(124,'Class A','Nicole','Gonzales',0,'5966822099',1),(125,'Class D','Kimberly','Scott',0,'9118343796',1),(126,'Class E','Jay','Lee',0,'6086324519',1),(127,'Class D','Daniel','Hernandez',0,'5541712954',1),(128,'Class A','Yesenia','Sanchez',0,'4190128636',1),(129,'Class A','Debra','Walker',0,'1392416574',1),(130,'Class C','Brian','Warren',0,'7917297314',1),(131,'Class E','Rachael','Johnson',0,'3972879046',1),(132,'Class E','Christopher','Fuller',0,'2362046592',1),(133,'Class D','Rebecca','Moore',0,'2784111798',1),(134,'Class D','Cory','Jacobson',0,'2410144746',1),(135,'Class C','Jerry','Brown',0,'1220175418',1),(136,'Class B','Timothy','Nelson',0,'1269565683',1),(137,'Class D','Ralph','Abbott',0,'9988592227',1),(138,'Class E','Candice','Kemp',0,'1411832015',1),(139,'Class B','Kari','Johnson',0,'8260682752',1),(140,'Class B','Kristin','Robinson',0,'2965718364',1),(141,'Class C','Jennifer','Butler',0,'3566043728',1),(142,'Class E','Christina','Lopez',0,'2346875261',1),(143,'Class B','Jason','Stevens',0,'6093159831',1),(144,'Class E','Lauren','Nelson',0,'4222562659',1),(145,'Class E','Jill','Gonzales',0,'8607763294',1),(146,'Class B','Ruth','Camacho',0,'1848254123',1),(147,'Class A','Jennifer','Collier',0,'9126508432',1),(148,'Class E','Joel','Austin',0,'2063175267',1),(149,'Class C','Kristine','Miller',0,'3809716389',1),(150,'Class E','Danielle','Walker',0,'7493073326',1);
/*!40000 ALTER TABLE `Drivers` ENABLE KEYS */;
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
