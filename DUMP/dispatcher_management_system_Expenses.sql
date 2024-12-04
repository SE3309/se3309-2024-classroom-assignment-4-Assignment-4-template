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
-- Table structure for table `Expenses`
--

DROP TABLE IF EXISTS `Expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Expenses` (
  `Expense_ID` int NOT NULL AUTO_INCREMENT,
  `Job_ID` int DEFAULT NULL,
  `Truck_ID` int DEFAULT NULL,
  `Fuel_Cost` int NOT NULL,
  `Toll_Cost` int NOT NULL DEFAULT '0',
  `Other_Expenses` int NOT NULL DEFAULT '0',
  `Total_Cost` int NOT NULL DEFAULT '0',
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`Expense_ID`),
  KEY `Job_ID` (`Job_ID`),
  KEY `Truck_ID` (`Truck_ID`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`Job_ID`) REFERENCES `Jobs` (`Job_ID`),
  CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`Truck_ID`) REFERENCES `Trucks` (`Truck_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=515 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Expenses`
--

LOCK TABLES `Expenses` WRITE;
/*!40000 ALTER TABLE `Expenses` DISABLE KEYS */;
INSERT INTO `Expenses` VALUES (1,2078,197,211,17,189,417,'2024-09-16'),(2,2722,498,302,3,198,503,'2024-01-12'),(3,1868,444,111,72,120,303,'2024-08-02'),(4,1768,217,466,77,195,738,'2024-02-08'),(5,1423,294,303,54,198,555,'2024-01-08'),(6,791,220,411,75,46,532,'2024-04-07'),(7,2753,239,416,0,48,464,'2024-10-17'),(8,1822,40,146,17,200,363,'2024-04-01'),(9,968,475,102,86,95,283,'2024-07-14'),(10,2943,152,295,46,52,393,'2024-05-02'),(11,901,182,282,19,183,484,'2024-10-15'),(12,971,117,384,79,138,601,'2024-09-09'),(13,862,94,84,70,198,352,'2024-10-05'),(14,935,296,298,68,24,390,'2024-01-30'),(15,450,242,391,84,171,646,'2024-05-19'),(16,1356,480,415,29,77,521,'2024-11-13'),(17,1270,336,257,41,1,299,'2024-05-29'),(18,118,37,240,99,178,517,'2024-11-13'),(19,2167,203,312,26,138,476,'2024-02-14'),(20,2084,252,288,19,167,474,'2024-05-28'),(21,2858,110,167,17,198,382,'2024-10-12'),(22,1364,20,361,65,20,446,'2024-03-17'),(23,1593,444,404,74,43,521,'2024-04-05'),(24,452,299,482,38,146,666,'2024-07-31'),(25,1244,135,185,2,151,338,'2024-05-14'),(26,1092,455,97,51,191,339,'2024-02-06'),(27,793,367,145,87,139,371,'2024-03-15'),(28,2875,59,114,74,189,377,'2024-04-21'),(29,1193,165,103,1,130,234,'2024-02-28'),(30,2843,16,323,10,133,466,'2024-04-23'),(31,1201,327,273,3,179,455,'2024-02-10'),(32,439,344,174,3,153,330,'2024-10-06'),(33,1449,74,391,72,116,579,'2024-09-23'),(34,2992,369,399,11,93,503,'2024-03-22'),(35,2084,294,189,40,8,237,'2024-05-19'),(36,1953,96,289,42,87,418,'2024-01-18'),(37,1203,182,406,69,28,503,'2024-06-19'),(38,2914,202,227,27,41,295,'2024-01-22'),(39,1883,46,314,32,138,484,'2024-11-01'),(40,2474,135,450,37,177,664,'2024-08-29'),(41,1553,144,470,68,88,626,'2024-02-06'),(42,1594,197,357,45,140,542,'2024-01-23'),(43,1360,340,339,8,106,453,'2024-02-12'),(44,243,64,425,78,182,685,'2024-02-22'),(45,2248,283,106,63,80,249,'2024-02-07'),(46,2828,155,184,2,102,288,'2024-02-24'),(47,264,66,249,45,197,491,'2024-03-01'),(48,258,145,486,40,4,530,'2024-04-26'),(49,1813,367,86,2,126,214,'2024-03-01'),(50,1792,419,274,76,140,490,'2024-04-29'),(51,345,250,418,48,101,567,'2024-10-31'),(52,1022,353,376,85,6,467,'2024-07-13'),(53,1894,108,268,12,50,330,'2024-07-13'),(54,603,197,254,11,71,336,'2024-04-24'),(55,1612,462,444,92,79,615,'2024-02-22'),(56,1263,453,226,39,58,323,'2024-01-02'),(57,1668,88,460,63,122,645,'2024-07-18'),(58,1288,401,98,26,111,235,'2024-08-19'),(59,2039,332,382,3,72,457,'2024-01-29'),(60,2399,256,491,5,77,573,'2024-03-25'),(61,1798,41,102,31,83,216,'2024-02-15'),(62,1062,382,391,21,53,465,'2024-09-14'),(63,127,324,332,45,160,537,'2024-04-29'),(64,1390,136,367,50,134,551,'2024-04-18'),(65,591,227,233,77,10,320,'2024-09-03'),(66,201,197,296,18,187,501,'2024-10-17'),(67,1891,395,130,38,190,358,'2024-01-17'),(68,781,344,225,46,53,324,'2024-03-02'),(69,807,469,308,49,131,488,'2024-04-19'),(70,2598,444,362,55,173,590,'2024-05-31'),(71,1313,214,274,35,21,330,'2024-01-20'),(72,606,380,314,20,50,384,'2024-05-13'),(73,1385,83,409,90,136,635,'2024-02-09'),(74,1558,67,106,87,197,390,'2024-01-07'),(75,2421,232,445,43,136,624,'2024-09-27'),(76,1902,293,104,22,146,272,'2024-11-02'),(77,1758,390,424,0,83,507,'2024-03-07'),(78,1781,188,306,57,121,484,'2024-11-19'),(79,2707,491,124,23,61,208,'2024-08-04'),(80,930,499,99,62,87,248,'2024-09-25'),(81,1231,127,278,9,190,477,'2024-08-06'),(82,2565,498,394,61,164,619,'2024-11-02'),(83,222,283,317,73,29,419,'2024-03-07'),(84,1057,360,88,86,41,215,'2024-05-20'),(85,1440,127,255,27,195,477,'2024-02-01'),(86,1835,327,496,70,153,719,'2024-07-17'),(87,1162,234,389,41,44,474,'2024-09-03'),(88,2659,2,67,5,87,159,'2024-09-20'),(89,534,290,320,50,159,529,'2024-04-25'),(90,958,121,212,34,184,430,'2024-08-05'),(91,2912,436,257,41,149,447,'2024-04-23'),(92,2539,102,360,100,168,628,'2024-09-09'),(93,2717,428,300,82,56,438,'2024-02-21'),(94,138,107,487,56,132,675,'2024-07-18'),(95,1750,442,234,88,93,415,'2024-11-14'),(96,947,266,291,50,168,509,'2024-06-08'),(97,1589,84,472,14,37,523,'2024-04-30'),(98,2500,122,451,27,153,631,'2024-10-05'),(99,1081,121,86,64,98,248,'2024-02-01'),(100,1326,405,400,40,4,444,'2024-10-23'),(101,2607,18,325,47,196,568,'2024-09-08'),(102,2035,46,197,45,16,258,'2024-02-08'),(103,2241,419,99,85,45,229,'2024-08-27'),(104,111,477,339,39,187,565,'2024-08-14'),(105,2703,222,168,68,76,312,'2024-06-17'),(106,2425,43,238,75,0,313,'2024-02-28'),(107,551,97,340,30,162,532,'2024-01-21'),(108,1955,163,379,12,22,413,'2024-08-07'),(109,2560,13,334,87,195,616,'2024-03-21'),(110,2182,315,121,15,90,226,'2024-04-19'),(111,2454,202,222,22,19,263,'2024-09-12'),(112,2737,488,480,50,151,681,'2024-03-07'),(113,2749,293,487,31,86,604,'2024-11-08'),(114,1682,445,356,43,99,498,'2024-03-31'),(115,6,484,221,37,2,260,'2024-01-19'),(116,2947,344,234,27,81,342,'2024-03-11'),(117,334,281,312,83,119,514,'2024-06-29'),(118,105,494,306,63,126,495,'2024-09-20'),(119,1506,196,417,8,101,526,'2024-02-06'),(120,846,17,116,29,25,170,'2024-10-10'),(121,1774,149,304,12,195,511,'2024-08-26'),(122,2901,178,337,15,96,448,'2024-04-05'),(123,2143,406,373,37,21,431,'2024-09-20'),(124,2700,161,318,43,46,407,'2024-06-07'),(125,2098,277,346,30,193,569,'2024-03-25'),(126,420,241,105,88,151,344,'2024-06-05'),(127,422,464,293,74,195,562,'2024-06-22'),(128,1351,144,442,39,11,492,'2024-07-20'),(129,87,173,70,32,160,262,'2024-04-14'),(130,1121,26,226,43,1,270,'2024-04-02'),(131,1740,352,440,2,193,635,'2024-08-28'),(132,2570,170,486,30,58,574,'2024-06-07'),(133,70,380,205,46,126,377,'2024-05-24'),(134,208,367,141,35,172,348,'2024-10-24'),(135,184,289,454,36,187,677,'2024-06-22'),(136,2616,105,131,20,61,212,'2024-05-21'),(137,547,170,410,90,58,558,'2024-04-11'),(138,1277,112,270,86,118,474,'2024-07-26'),(139,2099,403,351,61,115,527,'2024-09-30'),(140,2210,346,241,67,59,367,'2024-01-09'),(141,2545,244,70,43,151,264,'2024-06-24'),(142,1405,260,414,95,125,634,'2024-06-15'),(143,1445,13,298,5,53,356,'2024-04-25'),(144,922,347,459,7,47,513,'2024-01-13'),(145,1715,423,370,9,12,391,'2024-06-15'),(146,2385,442,167,58,70,295,'2024-04-15'),(147,2876,75,195,82,38,315,'2024-07-22'),(148,1238,485,496,62,127,685,'2024-05-16'),(149,564,217,162,40,34,236,'2024-08-09'),(150,2360,464,266,90,105,461,'2024-02-06'),(151,2702,271,250,74,103,427,'2024-07-07'),(152,1276,312,111,88,175,374,'2024-06-25'),(153,619,132,341,96,152,589,'2024-01-20'),(154,251,55,367,50,133,550,'2024-05-09'),(155,2130,185,422,32,53,507,'2024-09-25'),(156,2261,133,245,81,175,501,'2024-11-16'),(157,434,123,133,76,179,388,'2024-08-01'),(158,2053,309,478,71,119,668,'2024-08-04'),(159,1722,345,466,46,135,647,'2024-05-27'),(160,1843,280,467,30,86,583,'2024-10-10'),(161,1043,228,413,8,154,575,'2024-07-19'),(162,1239,59,448,88,6,542,'2024-02-08'),(163,1439,359,96,25,186,307,'2024-07-31'),(164,469,474,69,22,121,212,'2024-07-24'),(165,1271,288,246,11,100,357,'2024-09-14'),(166,2323,220,98,34,15,147,'2024-02-15'),(167,1084,76,301,20,116,437,'2024-10-07'),(168,169,114,275,30,41,346,'2024-07-17'),(169,131,371,129,61,137,327,'2024-08-05'),(170,2772,8,73,41,115,229,'2024-03-01'),(171,467,177,395,0,114,509,'2024-08-24'),(172,2522,412,153,17,107,277,'2024-01-27'),(173,201,200,226,0,153,379,'2024-04-23'),(174,130,139,165,86,143,394,'2024-02-13'),(175,2484,476,494,50,177,721,'2024-04-18'),(176,2258,493,159,60,78,297,'2024-01-31'),(177,1569,58,264,86,19,369,'2024-06-20'),(178,1193,351,423,71,160,654,'2024-06-08'),(179,1516,178,228,19,45,292,'2024-11-08'),(180,2647,90,377,56,122,555,'2024-04-23'),(181,2085,344,323,48,186,557,'2024-06-01'),(182,1934,70,466,10,20,496,'2024-05-08'),(183,2446,291,297,97,76,470,'2024-09-30'),(184,16,151,464,67,69,600,'2024-07-10'),(185,2300,263,239,15,114,368,'2024-04-21'),(186,1557,63,166,40,50,256,'2024-10-10'),(187,716,59,250,20,168,438,'2024-01-10'),(188,2122,32,195,80,157,432,'2024-09-21'),(189,1374,101,98,0,23,121,'2024-07-29'),(190,2072,69,226,34,98,358,'2024-10-05'),(191,2033,266,281,28,165,474,'2024-08-01'),(192,1291,373,496,16,165,677,'2024-09-14'),(193,2729,39,388,90,154,632,'2024-02-25'),(194,781,333,271,69,109,449,'2024-07-12'),(195,749,233,82,33,43,158,'2024-11-09'),(196,2738,78,110,82,52,244,'2024-10-02'),(197,1459,483,275,18,158,451,'2024-11-10'),(198,1928,416,265,60,4,329,'2024-07-22'),(199,2306,437,430,57,50,537,'2024-02-27'),(200,1357,387,484,31,24,539,'2024-04-03'),(201,2471,315,312,20,62,394,'2024-07-11'),(202,790,86,241,45,98,384,'2024-01-11'),(203,2539,256,442,43,62,547,'2024-06-13'),(204,2919,323,192,44,149,385,'2024-04-04'),(205,1127,57,395,26,33,454,'2024-01-12'),(206,2639,247,159,60,103,322,'2024-07-26'),(207,2433,150,251,11,184,446,'2024-08-13'),(208,1750,339,357,51,125,533,'2024-07-06'),(209,1232,171,171,41,77,289,'2024-07-18'),(210,2427,318,226,89,114,429,'2024-06-07'),(211,706,314,401,68,151,620,'2024-03-29'),(212,725,397,107,97,50,254,'2024-04-21'),(213,1343,217,145,99,68,312,'2024-10-28'),(214,1629,432,93,69,48,210,'2024-10-01'),(215,955,485,446,97,40,583,'2024-04-15'),(216,1332,180,278,100,107,485,'2024-05-30'),(217,1269,190,239,21,95,355,'2024-11-17'),(218,1126,345,284,56,72,412,'2024-05-13'),(219,966,217,183,78,146,407,'2024-07-31'),(220,2790,89,206,79,67,352,'2024-09-15'),(221,2345,328,74,25,70,169,'2024-02-12'),(222,1540,268,210,1,137,348,'2024-05-02'),(223,2127,196,453,1,115,569,'2024-08-03'),(224,1146,127,107,61,158,326,'2024-04-27'),(225,846,373,120,17,2,139,'2024-02-05'),(226,872,447,183,81,42,306,'2024-01-21'),(227,1923,24,328,59,122,509,'2024-01-27'),(228,2189,16,381,60,122,563,'2024-10-27'),(229,2283,188,274,11,15,300,'2024-03-02'),(230,991,310,99,85,133,317,'2024-08-13'),(231,1379,215,445,58,59,562,'2024-03-03'),(232,552,235,129,62,71,262,'2024-05-07'),(233,2007,314,305,85,55,445,'2024-07-11'),(234,2355,487,123,18,88,229,'2024-07-07'),(235,46,135,97,50,198,345,'2024-05-10'),(236,2413,490,294,88,78,460,'2024-01-01'),(237,1639,452,119,34,5,158,'2024-11-17'),(238,2002,383,343,62,121,526,'2024-02-23'),(239,2990,303,95,53,47,195,'2024-09-25'),(240,1210,392,176,7,58,241,'2024-02-27'),(241,976,75,403,31,165,599,'2024-03-01'),(242,1379,55,235,27,172,434,'2024-07-17'),(243,1408,317,287,76,43,406,'2024-03-23'),(244,2628,243,77,55,67,199,'2024-07-30'),(245,2023,499,329,96,5,430,'2024-07-16'),(246,1803,419,179,95,117,391,'2024-03-26'),(247,2974,39,484,37,135,656,'2024-06-16'),(248,781,414,180,61,45,286,'2024-09-08'),(249,1,394,412,78,173,663,'2024-08-15'),(250,963,193,308,54,151,513,'2024-09-21'),(251,992,238,195,32,130,357,'2024-08-15'),(252,2734,331,147,27,100,274,'2024-09-24'),(253,2252,169,407,61,25,493,'2024-02-29'),(254,2992,428,480,68,194,742,'2024-03-18'),(255,1333,373,118,1,52,171,'2024-06-16'),(256,2861,150,316,0,62,378,'2024-10-01'),(257,666,396,326,52,45,423,'2024-05-25'),(258,2986,72,484,17,67,568,'2024-02-06'),(259,2332,460,261,45,146,452,'2024-11-19'),(260,2205,48,390,73,163,626,'2024-03-24'),(261,869,66,227,70,159,456,'2024-04-05'),(262,2233,130,401,81,0,482,'2024-02-20'),(263,1524,293,157,32,166,355,'2024-09-26'),(264,1492,258,188,75,47,310,'2024-06-25'),(265,2181,377,194,76,41,311,'2024-06-26'),(266,110,18,496,1,167,664,'2024-07-30'),(267,2662,77,477,78,163,718,'2024-10-05'),(268,2336,153,445,51,0,496,'2024-07-07'),(269,2888,197,200,38,89,327,'2024-11-14'),(270,2934,193,242,52,168,462,'2024-11-02'),(271,727,252,251,36,184,471,'2024-10-18'),(272,1305,360,355,14,163,532,'2024-06-23'),(273,2633,78,351,76,21,448,'2024-09-02'),(274,1436,492,477,0,18,495,'2024-02-14'),(275,2341,396,489,6,104,599,'2024-09-27'),(276,2632,44,225,88,118,431,'2024-09-12'),(277,659,130,246,98,184,528,'2024-07-10'),(278,1224,460,273,78,192,543,'2024-07-11'),(279,1643,374,122,89,27,238,'2024-11-13'),(280,1795,243,279,55,160,494,'2024-03-27'),(281,1425,458,81,96,57,234,'2024-04-05'),(282,2272,416,56,6,12,74,'2024-05-27'),(283,1826,281,122,87,10,219,'2024-09-18'),(284,612,465,76,95,144,315,'2024-07-05'),(285,1126,134,74,61,191,326,'2024-09-15'),(286,218,359,216,82,147,445,'2024-08-15'),(287,1694,301,494,10,157,661,'2024-10-12'),(288,2799,110,208,67,170,445,'2024-08-18'),(289,654,226,452,55,111,618,'2024-10-13'),(290,2716,321,253,61,93,407,'2024-04-02'),(291,2843,179,223,31,161,415,'2024-03-07'),(292,307,76,481,3,192,676,'2024-02-13'),(293,1500,210,229,24,50,303,'2024-01-29'),(294,1087,343,393,95,194,682,'2024-01-20'),(295,451,424,408,20,42,470,'2024-10-11'),(296,516,477,350,61,51,462,'2024-03-12'),(297,2847,29,488,65,137,690,'2024-10-15'),(298,1473,271,217,62,199,478,'2024-10-02'),(299,1928,378,303,74,32,409,'2024-08-13'),(300,2670,20,152,52,109,313,'2024-05-06'),(301,2043,500,299,58,157,514,'2024-05-31'),(302,1609,136,373,76,151,600,'2024-10-11'),(303,562,39,354,26,142,522,'2024-10-27'),(304,2217,376,384,25,125,534,'2024-11-10'),(305,2085,177,427,12,81,520,'2024-08-05'),(306,1606,229,280,80,185,545,'2024-08-22'),(307,2013,211,384,10,177,571,'2024-08-01'),(308,823,3,189,11,185,385,'2024-09-15'),(309,596,72,299,6,25,330,'2024-03-26'),(310,156,16,227,80,37,344,'2024-01-13'),(311,1165,473,59,93,28,180,'2024-06-24'),(312,1289,238,272,96,1,369,'2024-07-07'),(313,341,446,350,59,145,554,'2024-02-20'),(314,782,488,211,72,59,342,'2024-06-13'),(315,2705,322,194,35,176,405,'2024-10-24'),(316,1158,368,251,32,100,383,'2024-05-06'),(317,1838,406,495,23,54,572,'2024-01-26'),(318,1441,124,354,42,119,515,'2024-04-09'),(319,2992,328,187,98,123,408,'2024-09-20'),(320,2499,204,135,87,129,351,'2024-01-25'),(321,983,474,139,5,84,228,'2024-06-21'),(322,66,488,474,76,10,560,'2024-06-12'),(323,249,72,495,83,112,690,'2024-08-17'),(324,2445,6,352,98,172,622,'2024-10-30'),(325,660,422,459,47,85,591,'2024-05-27'),(326,2424,365,452,1,37,490,'2024-07-04'),(327,254,253,449,69,94,612,'2024-03-19'),(328,1842,482,192,25,164,381,'2024-09-10'),(329,1154,381,418,10,191,619,'2024-07-14'),(330,2008,327,420,71,185,676,'2024-07-14'),(331,2778,402,151,18,59,228,'2024-08-24'),(332,2825,41,424,2,41,467,'2024-10-06'),(333,1047,323,372,6,11,389,'2024-05-08'),(334,1010,491,158,65,2,225,'2024-10-07'),(335,2630,158,137,86,116,339,'2024-01-27'),(336,2616,279,243,61,189,493,'2024-03-10'),(337,2613,280,490,67,159,716,'2024-09-29'),(338,2637,389,107,23,144,274,'2024-06-24'),(339,2748,71,262,18,185,465,'2024-05-02'),(340,1854,471,213,45,108,366,'2024-05-04'),(341,2399,117,315,59,23,397,'2024-03-07'),(342,2708,54,276,26,169,471,'2024-08-05'),(343,2044,15,215,71,13,299,'2024-02-28'),(344,2965,136,217,15,96,328,'2024-01-04'),(345,1935,92,288,20,50,358,'2024-03-28'),(346,1797,53,75,84,134,293,'2024-03-04'),(347,2032,425,379,18,0,397,'2024-01-24'),(348,1522,300,165,72,114,351,'2024-02-23'),(349,2109,423,496,29,39,564,'2024-03-16'),(350,2456,424,74,37,107,218,'2024-01-25'),(351,2609,179,473,100,47,620,'2024-09-30'),(352,886,345,319,38,57,414,'2024-01-02'),(353,2378,376,130,65,95,290,'2024-11-08'),(354,2980,115,453,93,123,669,'2024-05-22'),(355,107,10,430,82,65,577,'2024-01-04'),(356,2039,426,363,39,164,566,'2024-06-24'),(357,1002,8,61,50,100,211,'2024-11-19'),(358,1262,71,352,93,42,487,'2024-02-16'),(359,2717,437,148,28,154,330,'2024-10-17'),(360,2550,33,423,47,121,591,'2024-10-30'),(361,1786,402,103,34,130,267,'2024-04-05'),(362,295,96,129,100,124,353,'2024-01-24'),(363,1592,234,322,90,62,474,'2024-02-28'),(364,597,439,326,47,74,447,'2024-10-25'),(365,2690,72,456,3,105,564,'2024-08-05'),(366,661,202,211,85,44,340,'2024-06-14'),(367,215,30,248,95,171,514,'2024-09-05'),(368,356,159,465,29,18,512,'2024-09-22'),(369,2267,423,247,76,34,357,'2024-08-15'),(370,1220,458,380,43,7,430,'2024-10-19'),(371,2180,285,189,66,146,401,'2024-01-26'),(372,1090,431,389,45,26,460,'2024-07-09'),(373,1627,456,333,18,190,541,'2024-01-01'),(374,1435,3,221,70,18,309,'2024-04-08'),(375,1575,473,208,93,74,375,'2024-08-12'),(376,2392,216,92,56,140,288,'2024-09-22'),(377,1701,104,134,97,8,239,'2024-07-24'),(378,2355,306,182,71,132,385,'2024-03-28'),(379,1795,247,419,60,41,520,'2024-09-22'),(380,1880,332,460,22,188,670,'2024-02-20'),(381,1638,145,372,41,197,610,'2024-07-20'),(382,1434,239,246,50,183,479,'2024-09-12'),(383,644,58,224,94,79,397,'2024-01-07'),(384,2222,373,403,70,114,587,'2024-11-07'),(385,2785,158,136,71,149,356,'2024-03-18'),(386,764,464,133,35,112,280,'2024-02-28'),(387,1236,75,336,94,130,560,'2024-10-19'),(388,2381,19,92,4,90,186,'2024-07-28'),(389,1255,159,174,99,171,444,'2024-08-14'),(390,1586,450,252,46,5,303,'2024-03-23'),(391,1581,386,151,74,86,311,'2024-03-15'),(392,2007,58,318,82,157,557,'2024-08-21'),(393,2239,376,123,89,171,383,'2024-10-25'),(394,1772,302,85,87,185,357,'2024-01-11'),(395,474,425,208,92,157,457,'2024-11-08'),(396,2445,78,402,25,115,542,'2024-03-24'),(397,2442,153,427,58,2,487,'2024-06-22'),(398,477,218,390,37,128,555,'2024-11-07'),(399,1133,361,325,60,112,497,'2024-08-01'),(400,1022,398,156,6,151,313,'2024-06-18'),(401,1344,430,404,97,120,621,'2024-06-20'),(402,1201,377,146,19,36,201,'2024-03-13'),(403,927,103,93,67,130,290,'2024-02-04'),(404,1199,97,288,79,50,417,'2024-10-14'),(405,1594,227,378,58,90,526,'2024-09-30'),(406,1267,435,469,92,30,591,'2024-03-17'),(407,466,466,221,80,152,453,'2024-07-02'),(408,858,259,444,1,61,506,'2024-04-20'),(409,2788,101,278,50,106,434,'2024-08-27'),(410,220,99,293,92,71,456,'2024-08-22'),(411,798,474,305,44,61,410,'2024-05-07'),(412,235,144,204,96,49,349,'2024-08-29'),(413,2471,246,185,48,3,236,'2024-01-02'),(414,1790,213,126,100,9,235,'2024-04-11'),(415,67,472,108,69,84,261,'2024-04-23'),(416,1930,239,194,38,141,373,'2024-02-20'),(417,1861,164,333,90,159,582,'2024-10-19'),(418,810,313,179,29,86,294,'2024-09-18'),(419,822,119,256,10,157,423,'2024-04-01'),(420,2162,470,213,25,91,329,'2024-03-07'),(421,79,486,74,41,111,226,'2024-02-07'),(422,1283,257,492,11,97,600,'2024-02-26'),(423,215,50,65,40,114,219,'2024-03-28'),(424,1523,307,362,56,118,536,'2024-08-29'),(425,1548,454,326,61,1,388,'2024-05-09'),(426,479,352,194,69,71,334,'2024-02-29'),(427,202,227,364,37,23,424,'2024-05-14'),(428,836,350,222,86,90,398,'2024-09-10'),(429,2268,1,242,4,111,357,'2024-10-22'),(430,102,131,292,35,185,512,'2024-01-14'),(431,2209,21,351,4,99,454,'2024-07-26'),(432,41,97,102,78,37,217,'2024-08-10'),(433,2709,188,267,30,176,473,'2024-07-27'),(434,2477,388,373,6,64,443,'2024-01-18'),(435,1321,43,149,99,84,332,'2024-04-14'),(436,34,225,417,52,186,655,'2024-03-22'),(437,1402,401,262,44,147,453,'2024-06-24'),(438,653,40,411,65,127,603,'2024-08-13'),(439,1839,471,254,96,55,405,'2024-04-21'),(440,1176,170,310,7,56,373,'2024-04-07'),(441,1031,183,170,70,86,326,'2024-09-21'),(442,54,18,219,94,194,507,'2024-09-02'),(443,2051,100,80,96,52,228,'2024-07-15'),(444,755,176,354,42,87,483,'2024-09-10'),(445,233,392,188,86,28,302,'2024-01-17'),(446,1126,459,350,60,19,429,'2024-08-24'),(447,1447,483,275,95,22,392,'2024-02-17'),(448,693,420,120,58,146,324,'2024-10-16'),(449,690,269,496,56,135,687,'2024-10-21'),(450,774,292,290,77,105,472,'2024-09-03'),(451,501,374,88,40,184,312,'2024-10-04'),(452,743,444,91,77,148,316,'2024-04-25'),(453,1320,422,362,48,193,603,'2024-05-18'),(454,2885,274,457,30,57,544,'2024-02-10'),(455,638,245,115,92,130,337,'2024-11-01'),(456,511,400,190,1,109,300,'2024-07-22'),(457,1827,157,369,57,20,446,'2024-04-21'),(458,2203,158,436,52,65,553,'2024-04-01'),(459,1108,369,500,90,35,625,'2024-05-21'),(460,445,427,374,35,41,450,'2024-11-09'),(461,2935,61,61,33,40,134,'2024-05-09'),(462,501,99,202,97,138,437,'2024-06-25'),(463,990,226,142,12,2,156,'2024-10-16'),(464,605,286,365,99,102,566,'2024-05-30'),(465,1930,342,145,14,78,237,'2024-03-24'),(466,1804,36,459,9,124,592,'2024-06-05'),(467,1881,227,203,24,53,280,'2024-07-19'),(468,1533,361,366,84,99,549,'2024-03-25'),(469,732,246,327,34,133,494,'2024-06-21'),(470,1422,134,58,29,120,207,'2024-06-08'),(471,591,496,464,96,76,636,'2024-02-20'),(472,1755,56,180,70,63,313,'2024-04-23'),(473,27,363,247,3,193,443,'2024-08-26'),(474,1454,83,346,68,186,600,'2024-05-24'),(475,2579,436,404,22,32,458,'2024-03-09'),(476,701,311,461,81,8,550,'2024-03-02'),(477,755,124,426,77,167,670,'2024-01-14'),(478,542,243,289,10,121,420,'2024-07-14'),(479,1049,338,191,47,38,276,'2024-06-23'),(480,634,54,252,44,44,340,'2024-10-19'),(481,2869,131,86,34,48,168,'2024-05-26'),(482,2577,489,472,87,89,648,'2024-11-05'),(483,207,226,99,54,118,271,'2024-10-16'),(484,2628,145,285,65,100,450,'2024-01-31'),(485,1438,212,140,53,38,231,'2024-02-01'),(486,2846,472,63,92,155,310,'2024-05-12'),(487,884,369,144,36,52,232,'2024-10-14'),(488,150,434,301,23,27,351,'2024-08-13'),(489,358,110,500,71,193,764,'2024-07-23'),(490,1686,455,338,30,83,451,'2024-01-19'),(491,2936,255,233,53,44,330,'2024-09-15'),(492,672,115,262,27,174,463,'2024-02-27'),(493,2946,198,234,87,107,428,'2024-06-05'),(494,90,93,74,58,93,225,'2024-07-26'),(495,2830,405,145,49,83,277,'2024-02-23'),(496,1474,149,156,7,30,193,'2024-01-30'),(497,696,207,210,16,83,309,'2024-11-02'),(498,2602,15,167,21,164,352,'2024-02-14'),(499,2186,62,452,80,110,642,'2024-09-08'),(500,1888,426,85,47,86,218,'2024-05-04'),(501,189,1,0,0,0,0,'2024-11-24'),(502,1058,1,0,0,0,0,'2024-11-24'),(503,1617,1,0,0,0,0,'2024-11-24'),(504,2292,1,0,0,0,0,'2024-11-24'),(505,1279,1,0,0,0,0,'2024-11-24'),(508,189,1,0,0,0,0,'2024-11-24'),(509,1058,1,0,0,0,0,'2024-11-24'),(510,1617,1,0,0,0,0,'2024-11-24'),(511,2292,1,0,0,0,0,'2024-11-24'),(512,1279,1,0,0,0,0,'2024-11-24');
/*!40000 ALTER TABLE `Expenses` ENABLE KEYS */;
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