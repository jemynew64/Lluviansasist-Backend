-- Insertar Roles
INSERT INTO Roles (description, enabled) VALUES
('Admin', 1),
('Coach', 1),
('Player', 1);

-- Insertar Locations
INSERT INTO Locations (branch, description, district, enabled) VALUES
('Main Branch', 'Main branch description', 'Ate', 1),
('Secondary Branch', 'Secondary branch description', 'San Isidro', 1);

-- Insertar Fields
INSERT INTO Fields (description, enabled) VALUES
('Field 1', 1),
('Field 2', 1);

-- Insertar Sports
INSERT INTO Sports (description, enabled) VALUES
('Football', 1),
('Basketball', 1);

-- Insertar Users
INSERT INTO Users (firstName, lastName, username, password, dni, emergency_number, phone, birthDate, gender, roleId, locationId, enabled) VALUES
('John', 'Doe', 'johndoe', 'password123', 12345678, '987654321', 999999999, '1990-01-01', 'Male', 1, 1, 1),
('Jane', 'Smith', 'janesmith', 'password456', 87654321, '123456789', 888888888, '1995-05-05', 'Female', 2, 1, 1);


-- Insertar CoachSports
INSERT INTO CoachSports (idUser, idSport, coachType, enabled) VALUES
(1, 1, 'Head Coach', 1),
(2, 2, 'Assistant Coach', 1);

-- Insertar Schedules
INSERT INTO Schedules (startTime, endTime, day, enabled) VALUES
('09:00:00', '10:00:00', 'Monday', 1),
('10:00:00', '11:00:00', 'Tuesday', 1);

-- Insertar Trainings
INSERT INTO Trainings (idCoachSport, idSchedule, idField, enabled) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1);

-- Insertar Registrations
INSERT INTO Registrations (idTraining, idUser, enabled) VALUES
(1, 1, 1),
(2, 2, 1);

-- Insertar Attendances
INSERT INTO Attendances (idRegistration, classNumber, date, attendanceStatus, enabled) VALUES
(1, 1, '2024-10-01 09:00:00', 'Present', 1),
(2, 2, '2024-10-02 10:00:00', 'Absent', 1);

-- Insertar Dates
INSERT INTO Dates (date, enabled) VALUES
('2024-10-01 00:00:00', 1),
('2024-10-02 00:00:00', 1);