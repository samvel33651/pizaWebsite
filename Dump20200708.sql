-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_c2d24ac8ecdc1e7
-- ------------------------------------------------------
-- Server version	5.6.47-log

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
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `order_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  KEY `prod_id` (`prod_id`),
  KEY `order_id` (`order_id`) USING BTREE,
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `products` (`prod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,6,0),(1,2,8,0),(2,1,6,0),(7,1,3,0),(7,2,4,0),(10,1,3,0),(10,2,4,0),(12,1,3,0),(12,2,4,0),(301,1,1,0),(301,2,6,0),(301,6,4,0),(311,1,1,0),(311,2,6,0),(311,6,4,0),(321,1,1,0),(321,2,6,0),(321,6,4,0),(331,1,1,0),(331,2,6,0),(331,6,4,0),(341,1,1,0),(341,2,6,0),(341,6,4,0),(351,1,1,0),(351,2,6,0),(351,6,4,0),(361,6,4,0),(361,2,6,0),(371,1,1,0),(371,2,1,0),(381,1,6,0),(391,2,5,0),(391,4,1,0),(391,6,2,0),(391,9,9,0),(401,1,3,0);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `delivery_address` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=411 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,14,NULL),(8,15,NULL),(11,15,'d malyan 6 apt 56'),(21,17,'dmalyan 6 56'),(31,15,'malyan 6'),(41,17,'123456'),(51,17,'qdsadasdasdasdasdasd'),(61,17,'D. Malyan 6'),(71,17,'123456'),(81,17,'123456'),(91,17,'D. Malyan 6'),(101,17,'D. Malyan 6'),(111,17,'D. Malyan 6'),(121,17,'D. Malyan 6'),(131,17,'D. Malyan 6'),(141,17,'D. Malyan 6'),(151,17,'D. Malyan 6'),(161,17,'D. Malyan 6'),(171,17,'D. Malyan 6'),(181,17,'D. Malyan 6'),(191,17,'D. Malyan 6'),(201,17,'D. Malyan 6'),(211,17,'D. Malyan 6'),(221,17,'D. Malyan 6'),(231,17,'D. Malyan 6'),(241,17,'D. Malyan 6'),(251,17,'D. Malyan 6'),(261,17,'D. Malyan 6'),(271,17,'D. Malyan 6'),(281,17,'D. Malyan 6'),(291,17,'D. Malyan 6'),(301,17,'D. Malyan 6'),(311,17,'D. Malyan 6'),(321,17,'950 Ridge RD C25'),(331,17,'D. Malyan 6'),(341,17,'950 Ridge RD C25'),(351,17,'950 Ridge RD C25'),(361,17,'950 Ridge RD C25'),(371,17,'950 Ridge RD C25'),(381,17,'D. Malyan 6'),(391,17,'D. Malyan 6 56 apt'),(401,71,'D. Malyan 6');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(75) NOT NULL,
  `description` text NOT NULL,
  `img_src` varchar(150) NOT NULL,
  `price` float NOT NULL,
  UNIQUE KEY `prod_id` (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Tashir','Tashir main pizzza. With mozarela and other things.','pictures/tashir.jpg',8.85),(2,'Monaco','Tomatoes, pork fillets, ham, chicken breast, Bulgarian pepper, cheese white sauce \"Majorio\".','pictures/monaco.jpg',8.86),(4,'Pepperoni','Sausage Pepperoni, spicy Bulgarian pepper, tomato, cheese, white sauce \"Majorio\"','pictures/pepper.jpg',8.75),(5,'Diablo','Ham, mushrooms, hot and red pepper, cheese, white sauce \"Majorio\".','pictures/diablo.jpg',8.56),(6,'Assure','Semi-smoked sausage, mushrooms, tomatoes, cheese, dill, white sauce \"Majorio\".','pictures/assort.jpg',8.72),(7,'Venice','Mushrooms, chicken breast, cheese, white sauce \"Majorio\".','pictures/venecia.jpg',8.43),(8,'Tenderness','Ham, mushrooms, cheese, white sauce \"Majorio\".','pictures/nrbutyun.jpg',8.65),(9,'Siciliana','Bacon, smoked pork fillet, spicy and Bulgarian ․ pepper, tomato, cheese.','pictures/lahmajo.jpg',8.35);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'SS','test1@gmail.com','123456','2020-07-02 17:58:45','2020-07-02 17:58:45'),(14,'SS','test2@gmail.com','123456','2020-07-02 17:59:59','2020-07-02 17:59:59'),(15,'SS','test4@gmail.com','123456','2020-07-02 18:03:35','2020-07-02 18:03:35'),(17,'SS','test15@gmail.com','123456','2020-07-02 18:28:46','2020-07-02 18:28:46'),(18,'SS','test17@gmail.com','123456','2020-07-02 18:32:11','2020-07-02 18:32:11'),(19,'SS','test18@gmail.com','123456','2020-07-02 19:13:42','2020-07-02 19:13:42'),(20,'SS','test19@gmail.com','123456','2020-07-02 19:14:10','2020-07-02 19:14:10'),(21,'SS','test39@gmail.com','123456','2020-07-04 18:04:43','2020-07-04 18:04:43'),(31,'Admin','admin_test@gmail.com','123456','2020-07-08 04:42:36','2020-07-08 04:42:36'),(41,'Admin1','admin_test1@gmail.com','123456','2020-07-08 04:44:26','2020-07-08 04:44:26'),(51,'newAdmin','admin1@gmail.com','123456','2020-07-08 04:48:19','2020-07-08 04:48:19'),(61,'test name','testn@gmail.com','123456','2020-07-08 05:31:56','2020-07-08 05:31:56'),(71,'newuser','new_user@gmail.com','123456','2020-07-08 05:44:50','2020-07-08 05:44:50'),(81,'samvel3253','lusinelw@gmail.com','123456','2020-07-08 05:51:55','2020-07-08 05:51:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-08 10:07:11
