DROP SCHEMA IF EXISTS `cruddb`;
CREATE SCHEMA
IF NOT EXISTS `cruddb`;

CREATE TABLE
IF NOT EXISTS `cruddb`.`commandes`
(
  `id_commandes` INT
(11) NOT NULL AUTO_INCREMENT,
  `nameorder` VARCHAR
(45) NOT NULL,
  `phonenumberorder` INT
(11) NOT NULL,
  `emailorder` VARCHAR
(45) NOT NULL,
  `type` VARCHAR
(45) NOT NULL,
  `Quantity` INT
(11) NOT NULL,
  `fileorder` VARCHAR
(45) NOT NULL,
  `price` INT
(11) NOT NULL,
  PRIMARY KEY
(`id_commandes`))


CREATE TABLE
IF NOT EXISTS `cruddb`.`users`
(
  `idusers` INT
(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR
(45) NULL DEFAULT NULL,
  `password` VARCHAR
(45) NULL DEFAULT NULL,
  PRIMARY KEY
(`idusers`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER
SET = utf8mb4