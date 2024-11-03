-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS dblluvians;

-- Crear la base de datos nuevamente
CREATE DATABASE dblluvians;

-- Usar la base de datos creada
USE dblluvians;

-- Crear Roles con validaciones
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Locations con validaciones
CREATE TABLE `Locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Fields con validaciones
CREATE TABLE `Fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Sports con validaciones
CREATE TABLE `Sports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Users con validaciones
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `dni` int NOT NULL UNIQUE,
  `emergency_number` varchar(15) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birthDate` datetime NOT NULL,
  `gender` enum('Male', 'Female', 'Other') NOT NULL,
  `roleId` int NOT NULL,
  `locationId` int NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`),
  FOREIGN KEY (`locationId`) REFERENCES `Locations`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear CoachSports con validaciones
CREATE TABLE `CoachSports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `idSport` int NOT NULL,
  `coachType` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`idSport`) REFERENCES `Sports`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Schedules con validaciones
CREATE TABLE `Schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Trainings con validaciones
CREATE TABLE `Trainings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCoachSport` int NOT NULL,
  `idSchedule` int NOT NULL,
  `idField` int NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCoachSport`) REFERENCES `CoachSports`(`id`),
  FOREIGN KEY (`idSchedule`) REFERENCES `Schedules`(`id`),
  FOREIGN KEY (`idField`) REFERENCES `Fields`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Registrations con validaciones
CREATE TABLE `Registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idTraining` int NOT NULL,
  `idUser` int NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idTraining`) REFERENCES `Trainings`(`id`),
  FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Attendances con validaciones
CREATE TABLE `Attendances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRegistration` int NOT NULL,
  `classNumber` int NOT NULL,
  `date` datetime NOT NULL,
  `attendanceStatus` enum('Present', 'Absent', 'Late') NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idRegistration`) REFERENCES `Registrations`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Crear Dates con validaciones
CREATE TABLE `Dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
