import { z } from "zod";

// Esquema para Roles
export const RoleSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  description: z.string().min(1, "Description is required"),
  enabled: z.boolean().default(true),
});

// Esquema para Locations
export const LocationSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  branch: z.string().min(1, "Branch is required"),
  description: z.string().min(1, "Description is required"),
  district: z.string().min(1, "District is required"),
  enabled: z.boolean().default(true),
});

// Esquema para Fields
export const FieldSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  description: z.string().min(1, "Description is required"),
  enabled: z.boolean().default(true),
});

// Esquema para Sports
export const SportSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  description: z.string().min(1, "Description is required"),
  enabled: z.boolean().default(true),
});

// Esquema para Users
export const UserSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  dni: z.number().int().positive(),
  emergency_number: z.string().min(1, "Emergency number is required"),
  phone: z.string().min(1, "Phone number is required"),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  roleId: z.number().int(),
  locationId: z.number().int(),
  enabled: z.boolean().default(true),
});

// Esquema para CoachSports
export const CoachSportSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  idUser: z.number().int(),
  idSport: z.number().int(),
  coachType: z.string().min(1, "Coach type is required"),
  enabled: z.boolean().default(true),
});

// Esquema para Schedules
export const ScheduleSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  startTime: z.string(),
  endTime: z.string(),
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  enabled: z.boolean().default(true),
});

// Esquema para Trainings
export const TrainingSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  idCoachSport: z.number().int(),
  idSchedule: z.number().int(),
  idField: z.number().int(),
  enabled: z.boolean().default(true),
});

// Esquema para Registrations
export const RegistrationSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  idTraining: z.number().int(),
  idUser: z.number().int(),
  enabled: z.boolean().default(true),
});

// Esquema para Attendances
export const AttendanceSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  idRegistration: z.number().int(),
  classNumber: z.number().int().positive(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  attendanceStatus: z.enum(["Present", "Absent", "Late"]),
  enabled: z.boolean().default(true),
});

// Esquema para Dates
export const DateSchema = z.object({
  id: z.number().int().optional(), // Opcional para creación
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  enabled: z.boolean().default(true),
});
