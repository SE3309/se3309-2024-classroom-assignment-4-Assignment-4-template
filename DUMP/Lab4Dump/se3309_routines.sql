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
-- Temporary view structure for view `userbookingsummary`
--

DROP TABLE IF EXISTS `userbookingsummary`;
/*!50001 DROP VIEW IF EXISTS `userbookingsummary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userbookingsummary` AS SELECT 
 1 AS `userID`,
 1 AS `name`,
 1 AS `email`,
 1 AS `bookingID`,
 1 AS `cost`,
 1 AS `bookingStatus`,
 1 AS `bookingDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `hotelavailability`
--

DROP TABLE IF EXISTS `hotelavailability`;
/*!50001 DROP VIEW IF EXISTS `hotelavailability`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `hotelavailability` AS SELECT 
 1 AS `hotelID`,
 1 AS `hotelName`,
 1 AS `city`,
 1 AS `roomType`,
 1 AS `pricePerNight`,
 1 AS `availabilityStatus`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `userbookingsummary`
--

/*!50001 DROP VIEW IF EXISTS `userbookingsummary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userbookingsummary` AS select `user`.`userID` AS `userID`,`user`.`name` AS `name`,`user`.`email` AS `email`,`booking`.`bookingID` AS `bookingID`,`booking`.`cost` AS `cost`,`booking`.`bookingStatus` AS `bookingStatus`,`booking`.`bookingDate` AS `bookingDate` from (`user` join `booking` on((`user`.`userID` = `booking`.`userID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `hotelavailability`
--

/*!50001 DROP VIEW IF EXISTS `hotelavailability`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `hotelavailability` AS select `hotel`.`hotelID` AS `hotelID`,`hotel`.`hotelName` AS `hotelName`,`hotel`.`city` AS `city`,`hotelroom`.`roomType` AS `roomType`,`hotelroom`.`pricePerNight` AS `pricePerNight`,`hotelroom`.`availabilityStatus` AS `availabilityStatus` from (`hotel` join `hotelroom` on((`hotel`.`hotelID` = `hotelroom`.`hotelID`))) where (`hotelroom`.`availabilityStatus` = true) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 21:04:38
