-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dev_hris
-- ------------------------------------------------------
-- Server version	5.5.62

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aa_departments`
--

DROP TABLE IF EXISTS `aa_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aa_departments` (
  `Department_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Department_Name` varchar(50) DEFAULT NULL,
  `Manager_Id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Department_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aa_departments`
--

LOCK TABLES `aa_departments` WRITE;
/*!40000 ALTER TABLE `aa_departments` DISABLE KEYS */;
INSERT INTO `aa_departments` VALUES (1,'Management',NULL),(2,'Support',NULL),(3,'Delivery',NULL),(4,'Inside - Sales',NULL),(5,'Sales/ Microsoft',NULL),(6,'Product',NULL),(7,'Sears',NULL),(8,'Cofounder',NULL),(9,'Presales',NULL),(10,'Founders',NULL),(11,'Support - IT',NULL),(12,'Support - HR',NULL),(13,'Support - Finance',NULL),(14,'Support - Marketing',NULL),(15,'Support - IT & Admin',NULL),(16,'Sales',NULL),(17,'Account Management',NULL),(18,'Source Of Hire',NULL),(19,'Walk Ins',NULL);
/*!40000 ALTER TABLE `aa_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `Employee_Id` varchar(20) NOT NULL,
  `Employee_Name` varchar(200) NOT NULL,
  `Design_At_Joining` varchar(50) DEFAULT NULL,
  `Joining_Date` date DEFAULT NULL,
  `Dob_Official` date DEFAULT NULL,
  `Dob_Actual` date DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Blood_Group` varchar(10) DEFAULT NULL,
  `Contact_No` varchar(50) DEFAULT NULL,
  `Alternate_Contact_No` varchar(45) DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Religion` varchar(50) DEFAULT NULL,
  `Marital_Status` varchar(45) DEFAULT NULL,
  `No_Of_Children` int(2) DEFAULT '0',
  `Photograph` varchar(99) DEFAULT NULL,
  `Reporting_Manager` varchar(45) DEFAULT NULL,
  `Probation_Period` int(2) DEFAULT NULL,
  `Work_Location` varchar(45) DEFAULT NULL,
  `Source_of_Hire` varchar(45) DEFAULT NULL,
  `CTC` varchar(10) DEFAULT '0',
  `Source_Of_Hire_Name` varchar(50) DEFAULT NULL,
  `Emergency_Contact_No` varchar(45) DEFAULT NULL,
  `Emergency_Contact_Name` varchar(45) DEFAULT NULL,
  `Emergency_Contact_Relation` varchar(45) DEFAULT NULL,
  `HR_SPOC` varchar(45) DEFAULT NULL,
  `PersonalEmail_Id` varchar(100) DEFAULT NULL,
  `OfficialEmail_Id` varchar(100) DEFAULT NULL,
  `Skype_Id` varchar(100) DEFAULT NULL,
  `Aadhar_No` varchar(12) DEFAULT NULL,
  `Name_On_Aadhar` varchar(200) DEFAULT NULL,
  `DOB_On_Aadhar` date DEFAULT NULL,
  `PAN` varchar(45) DEFAULT NULL,
  `Name_On_PAN` varchar(200) DEFAULT NULL,
  `UAN` varchar(20) DEFAULT NULL,
  `PF_No` varchar(45) DEFAULT NULL,
  `Prev_PF_No` varchar(45) DEFAULT NULL,
  `Emergency_Contact_Name_2` varchar(45) DEFAULT NULL,
  `Emergency_Contact_No_2` varchar(45) DEFAULT NULL,
  `Emergency_Contact_Relation_2` varchar(45) DEFAULT NULL,
  `Passport_No` varchar(20) DEFAULT NULL,
  `Passport_Issued_Date` date DEFAULT NULL,
  `Passport_Expiry_Date` date DEFAULT NULL,
  `Passport_Issuing_Country` varchar(100) DEFAULT NULL,
  `Passport_File` varchar(100) DEFAULT NULL,
  `Last_Updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Father_Name` varchar(100) DEFAULT NULL,
  `Mother_Name` varchar(100) DEFAULT NULL,
  `Spouse_Name` varchar(100) DEFAULT NULL,
  `Is_Spouse_Employed` varchar(45) DEFAULT NULL,
  `Spouse_Employer_Name` varchar(100) DEFAULT NULL,
  `Father_Contact` varchar(15) DEFAULT NULL,
  `Mother_Contact` varchar(15) DEFAULT NULL,
  `Spouse_Contact` varchar(15) DEFAULT NULL,
  `EAD` varchar(45) DEFAULT NULL,
  `EAD_Start_Date` date DEFAULT NULL,
  `EAD_Expiry_Date` date DEFAULT NULL,
  `EAD_Extendable` varchar(10) DEFAULT NULL,
  `SSN` varchar(45) DEFAULT NULL,
  `Last_Date` date DEFAULT NULL,
  `Termination_Type` varchar(45) DEFAULT NULL,
  `Current_Status` varchar(45) DEFAULT NULL,
  `Login_Access` varchar(45) DEFAULT 'Disabled',
  `Highest_Education` varchar(200) DEFAULT NULL,
  `VISA_Status` varchar(45) DEFAULT NULL,
  `Deleted` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Employee_Id`),
  UNIQUE KEY `Employee_Id_UNIQUE` (`Employee_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('EMP0001','Employee 1','7',NULL,NULL,NULL,'Male','A+','','','Indian',NULL,'',NULL,'','',NULL,'Bengaluru','Portal','0','Naukri','',NULL,NULL,'','','','','','',NULL,'','','','','','','',NULL,'',NULL,NULL,'',NULL,NULL,'','','','','','','','',NULL,NULL,NULL,NULL,NULL,NULL,'','Active','Enabled','B.E',NULL,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_address`
--

DROP TABLE IF EXISTS `employee_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_address` (
  `Address_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Employee_Id` varchar(20) NOT NULL,
  `Address_Type_Name` varchar(50) DEFAULT NULL,
  `Address_Line_1` varchar(1000) DEFAULT NULL,
  `Address_Line_2` varchar(1000) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `Zip_Code` int(11) DEFAULT NULL,
  `Contact_No` varchar(20) DEFAULT NULL,
  `Contact_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Address_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_address`
--

LOCK TABLES `employee_address` WRITE;
/*!40000 ALTER TABLE `employee_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_company_history`
--

DROP TABLE IF EXISTS `employee_company_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_company_history` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Employee_Id` varchar(20) NOT NULL,
  `Current_Designation` varchar(50) DEFAULT NULL,
  `Current_CTC` varchar(200) DEFAULT NULL,
  `Current_Location` varchar(50) DEFAULT NULL,
  `Company_History_Start_date` date DEFAULT NULL,
  `Company_History_End_date` date DEFAULT NULL,
  `Rating` varchar(200) DEFAULT NULL,
  `Promotion_Recommendation` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2798 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_company_history`
--

LOCK TABLES `employee_company_history` WRITE;
/*!40000 ALTER TABLE `employee_company_history` DISABLE KEYS */;
INSERT INTO `employee_company_history` VALUES (512,'EMP0001','7',NULL,NULL,'2016-03-15','2016-03-31','',''),(513,'EMP0001','7',NULL,NULL,'2016-04-01','2016-09-30','',''),(514,'EMP0001','7',NULL,NULL,'2016-10-01','2017-03-31','',''),(515,'EMP0001','7','',NULL,'2017-04-01','2017-09-30','',''),(516,'EMP0001','7','',NULL,'2017-10-01','2018-03-31','',''),(1475,'EMP0001','7','',NULL,'2018-04-01','2018-09-30','',''),(2166,'EMP0001','7','',NULL,'2018-10-01','2019-03-31','',''),(2486,'EMP0001','7','',NULL,'2019-04-01',NULL,'',NULL);
/*!40000 ALTER TABLE `employee_company_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `map_designations`
--

DROP TABLE IF EXISTS `map_designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `map_designations` (
  `Designation_Id` int(11) NOT NULL AUTO_INCREMENT,
  `Designation_Name` varchar(100) NOT NULL,
  `Designation_Code` varchar(100) DEFAULT NULL,
  `Department_Id` int(11) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Designation_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1 COMMENT='It contains the valid designation of the employees';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `map_designations`
--

LOCK TABLES `map_designations` WRITE;
/*!40000 ALTER TABLE `map_designations` DISABLE KEYS */;
INSERT INTO `map_designations` VALUES (1,'Senior Manager','Senior Manager',3,NULL,NULL),(2,'Manager','Manager',3,NULL,NULL),(3,'Consultant','Consultant',3,NULL,NULL),(4,'LSE','LSE',3,NULL,NULL),(5,'Technical Lead','TL',3,NULL,NULL),(6,'Senior Business Analyst','SBA',3,NULL,NULL),(7,'Senior Software Engineer','SSE',3,NULL,NULL),(8,'Senior Techical Analyst','Senior Technical Analyst',3,'2019-03-26 12:31:05','AAIN0271'),(9,'Software Engineer','SE',3,NULL,NULL),(10,'Data Scientist','DS',3,NULL,NULL),(11,'Business Analyst','BA',3,NULL,NULL),(12,'Business Analyst - C','BA - C',3,NULL,NULL),(13,'Business Analyst - C2','BA - C2',3,NULL,NULL),(14,'Business Analyst - C3','BA - C3',3,NULL,NULL),(15,'Management Trainee','MT',3,NULL,NULL),(16,'Data Scientist - C','DS - C',3,NULL,NULL),(17,'PPT Specialist','PPT',3,NULL,NULL),(18,'Internship','Intern',3,NULL,NULL),(19,'EVP - Delivery','EVP-Delivery',8,NULL,NULL),(20,'CEO','CEO',8,NULL,NULL),(21,'HR Manager','HR-Manager',12,NULL,NULL),(22,'Junior HR executive','Junior HR executive',12,NULL,NULL),(23,'Director','Director',1,NULL,NULL),(24,'Admin Executive','ADE',15,NULL,NULL),(25,'Vice President','VP',1,NULL,NULL),(26,'Marketing Manager','Marketing Manager',4,NULL,NULL),(27,'Business Analyst','BA',4,NULL,NULL),(28,'Manager Operations','Manager-Operations',15,'2019-02-26 15:33:39','AAIN0271'),(29,'Accounts Executive','Accounts Executive',13,NULL,NULL),(30,'Accounts Assistant','Accounts Assistant',13,NULL,NULL),(31,'IT Support','IT-Support',15,NULL,NULL),(32,'Business Analyst - Inside Sales','BA - Inside Sales',4,NULL,NULL),(33,'Vice President - Products And Solutions','VP - Products And Solutions',1,NULL,NULL),(34,'UI Designer','UI/UX Designer',14,NULL,NULL),(35,'Product Manager','Product Manager',3,NULL,NULL),(36,'Senior Software Engineer','SSE',14,NULL,NULL),(37,'Admin Assistant','Admin Assistant',15,NULL,NULL),(38,'Software Engineer','SE',6,NULL,NULL),(39,'HR Coordinator','HR-Coordinator',12,NULL,NULL),(40,'Specialist Recruitment','Specialist Recruitment',12,NULL,NULL),(41,'Software Engineer','SE',3,'2019-02-26 17:59:31','AAIN0271'),(42,'HR Executive','HR-Executive',12,NULL,NULL),(43,'HR Specialist','HR-Specialist',12,NULL,NULL),(44,'Senior UX Designer','Senior UX Designer',14,NULL,NULL),(45,'Team Lead HR','Team Lead HR',12,'2019-02-26 18:17:53','AAIN0271'),(46,'Travel Executive','Travel Executive',15,NULL,NULL),(47,'HR Coordinator','HR-Coordinator',12,'2019-02-26 15:24:11','AAIN0271'),(48,'Finance Manager','Finance Manager',13,NULL,NULL),(49,'Technical Lead','TL',7,NULL,NULL),(50,'Assistant Manager','ASM',3,NULL,NULL),(51,'Senior Data Scientist','Senior Data Scientist',3,NULL,NULL),(52,'Marketing Specialist','Marketing Specialist',14,NULL,NULL),(53,'Senior Business Analyst','SBA',7,NULL,NULL),(54,'PPT Specialist','PPT Specialist',3,'2019-02-26 15:38:14','AAIN0271'),(55,'Manager Analytics','Manager-Analytics',7,NULL,NULL),(56,'HR Trainee','HR-Trainee',12,NULL,NULL),(57,'Finance Executive','Finance Executive',13,NULL,NULL),(58,'Senior Finance Executive','Senior Finance Executive',13,NULL,NULL),(59,'Team Lead - Inside Sales','Team Lead - Inside Sales',4,NULL,NULL),(60,'Business Development Manager','BDM',3,NULL,NULL),(61,'Director - Head of Finance','Director - Head of Finance',13,NULL,NULL),(62,'Global VP- Sales & Marketing','Global VP- Sales & Marketing',1,NULL,NULL),(63,'Engagement Manager','EM',3,NULL,NULL),(64,'Senior Analyst','Senior Analyst',3,NULL,NULL),(65,'Director - Client Services','Director - Client Services',1,NULL,NULL),(66,'EVP - Head of Solutions & Innovation','EVP-Head of Solutions & Innovation',8,NULL,NULL),(67,'Account Manager','Account Manager',17,NULL,NULL),(68,'Director - Client Services','Director - Client Services',1,NULL,NULL),(69,'Admin','Admin',15,NULL,NULL),(70,'Lead Admin & Facilities','Lead-Admin & Facilities',15,'2019-03-18 12:08:10','AAIN0271'),(71,'Business Analyst - Inside Sales','BA - Inside Sales',4,'2019-03-18 12:08:10','AAIN0271'),(72,'Manager Operations','Manager Operations',15,NULL,NULL),(73,'Manager Finance','Manager-Finance',13,NULL,NULL),(74,'HR Executive','HR-Executive',12,NULL,NULL),(75,'Executive Assistant','Executive Assistant',12,NULL,NULL),(78,'Specialist IT','Specialist IT',15,NULL,NULL),(79,'Inside Sales','Inside Sales',4,NULL,NULL),(80,'Vice President - Products','VP - Products',1,NULL,NULL),(81,'Manager HR','Manager HR',12,NULL,NULL),(82,'Senior Admin Assitant','Senior Admin Assitant',15,NULL,NULL),(83,'Senior Technical Analyst','Senior Technical Analyst',3,NULL,NULL),(84,'Senior Accounts Executive','Senior Accounts Executive',13,NULL,NULL),(85,'Specialist Talent Acquisition','Specialist-Talent Acquisition',12,NULL,NULL),(86,'Team Lead HR','Team Lead HR',12,'2019-02-26 18:18:17','AAIN0271'),(87,'Specialist HR','Specialist HR',12,NULL,NULL),(88,'HR Specialist','HR-Specialist',12,'2019-02-26 15:30:59','AAIN0271'),(89,'Specialist Travel & Ops','Specialist-Travel & Ops',15,'2019-02-26 18:11:46','AAIN0271'),(90,'Specialist HR','Specialist HR',12,'2019-02-26 18:03:22','AAIN0271'),(92,'Senior Data Scientist','Senior Data Scientist',7,NULL,NULL),(93,'Specialist Marketing','Specialist-Marketing',14,NULL,NULL),(94,'Senior PPT Specialist','Senior PPT Specialist',3,'2019-02-26 15:48:40','AAIN0271'),(97,'Team Lead - Inside Sales','Team Lead - Inside Sales',4,NULL,NULL),(98,'EVP - Strategic Accounts','EVP-Strategic Accounts',8,NULL,NULL),(99,'Senior Business Analyst','SBA',3,'2019-02-26 15:45:28','AAIN0271'),(100,'Senior Account Manager','Senior Account Manager',3,NULL,NULL),(101,'Business Development Director','BDD',16,NULL,NULL),(102,'Senior Business Analyst','SBA',3,'2019-02-26 15:42:34','AAIN0271'),(103,'EVP - Solutions & Innovation','EVP-Solutions & Innovation',8,NULL,NULL),(104,'Senior Analyst','Senior Analyst',3,'2019-03-06 10:58:37','AAIN0271'),(105,'Technical Lead','TL',3,'2019-02-26 18:27:45','AAIN0271'),(106,'Specialist Immigration','Specialist-Immigration',12,NULL,NULL),(107,'Lead Admin & Facilities','Lead-Admin & Facilities',15,NULL,NULL),(108,'Senior Manager Operations','Senior Manager Operations',15,NULL,NULL),(109,'Team Lead IT','Team Lead IT',15,NULL,NULL),(110,'Senior Manager HR','Senior Manager HR',12,NULL,NULL),(111,'Team Lead HR','Team Lead HR',12,NULL,NULL),(112,'Specialist Travel & Ops','Specialist-Travel & Ops',15,NULL,NULL),(113,'Specialist IT','Specialist IT',15,'2019-02-26 18:08:15','AAIN0271'),(114,'Business Development Manager','BDM',16,NULL,NULL),(115,'Director - Head of Finance','Director - Head of Finance',13,'2019-02-26 15:23:30','AAIN0271'),(116,'Cosultant - Inside Sales','Cosultant - Inside Sales',4,NULL,NULL),(117,'Specialist Immigration','Specialist-Immigration',12,'2019-02-26 18:05:23','AAIN0271'),(118,'Senior PPT Specialist','Senior PPT Specialist',3,NULL,NULL),(119,'Executive VP- Head of Sales and Marketing','Executive VP- Head of Sales and Marketing',1,NULL,NULL),(120,'Vice President - Business Development','VP - Business Development',1,NULL,NULL),(121,'Consultant','Consultant',4,NULL,NULL),(122,'Senior Business Development Executive','Senior Business Development Executive',4,NULL,NULL),(123,'Business Development Executive','BDE',4,NULL,NULL),(124,'Business Analyst - Drive','BA - D',3,NULL,NULL),(125,'Senior Engagement Manager','Senior Engagement Manager',17,NULL,NULL),(126,'Vice President - Business Development','VP - Business Development',1,'2019-02-26 18:29:47','AAIN0271'),(129,'Recruitment Manager','Recruitment Manager',12,NULL,NULL),(150,'Vice President - Global Head of Data Engineering','VP - Global Head of Data Engineering',1,NULL,NULL),(151,'Senior Engagement Manager','Senior Engagement Manager',17,NULL,NULL),(152,'Manager Business Development','Manager-Business-Developement',4,NULL,NULL),(153,'Senior Vice President','Senior VP',1,NULL,NULL),(154,'Senior Manager -  Product, solutions & Innovations','Sr Manager - Product, Solution & Innovations',6,NULL,NULL),(155,'Scrum Master','Scrum Master',3,NULL,NULL),(156,'Specialist Marketing','Specialist Marketing',14,NULL,NULL),(157,'Specialist Recruitment','Specialist Recruitment',12,'2019-02-26 18:10:11','AAIN0271'),(170,'Test Engineer','TE',3,NULL,NULL),(171,'Senior Marketing Manager','Senior Marketing Manager',14,NULL,NULL),(172,'Engagement Manager','EM',17,NULL,NULL),(173,'Manager','Manager',17,NULL,NULL),(174,'Consultant','Consultant',14,NULL,NULL),(175,'Consultant','Consultant',5,NULL,NULL),(176,'Sales Manager','Sales Manager',4,NULL,NULL),(177,'Technical Lead','TL',6,NULL,NULL),(178,'Senior Software Engineer','SSE',6,NULL,NULL),(179,'Senior Software Engineer','SSE',7,NULL,NULL),(180,'Data Scientist','DS',6,NULL,NULL),(181,'Data Scientist','DS',7,NULL,NULL),(182,'Manager','Manager',7,NULL,NULL),(183,'HR Coordinator','HR-Coordinator',2,NULL,NULL),(184,'Admin Assistant','Admin Assistant',2,NULL,NULL),(185,'Sales Manager','Sales Manager',16,NULL,NULL),(186,'Manager','Manager',15,NULL,NULL),(187,'Senior Manager Marketing ','SMM',14,NULL,NULL),(188,'Sr Vice President','Sr Vice President',1,NULL,NULL),(189,'Team Lead Recruitment','Team Lead Recruitment',12,NULL,NULL),(190,'Lead Data Scientist','Lead Data Scientist',3,NULL,NULL),(191,'Lead Data Scientist','Lead Data Scientist',3,NULL,NULL),(192,'Principal Data Scientist','Principal Data Scientist',3,NULL,NULL),(193,'Team Lead','Team Lead',14,NULL,NULL),(194,'Data Engineer','DE',3,NULL,NULL),(195,'UI Designer','UI Designer',14,NULL,NULL),(196,'Technical Content Writer','TCW',14,NULL,NULL),(197,'Immigration Executive','Imm. Ex.',12,NULL,NULL),(198,'Senior Solution Analyst','SSA',3,NULL,NULL),(199,'Senior Solution Analyst','SSA',3,NULL,NULL),(200,'Vice President','VP',3,NULL,NULL),(201,'Lead Architect','Lead Arch.',3,NULL,NULL),(202,'Talent Coordinator','Talent Coord.',12,NULL,NULL);
/*!40000 ALTER TABLE `map_designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dev_hris'
--
/*!50003 DROP FUNCTION IF EXISTS `asOnDate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `asOnDate`() RETURNS date
    NO SQL
    DETERMINISTIC
RETURN @asOnDate; ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-07 18:21:46
