// src/config/menuItemsConfig.js

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccessibleForwardRoundedIcon from "@mui/icons-material/AccessibleForwardRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"; // 1. Importa el nuevo ícono

// --- MENÚ PARA CADA ROL ---
export const adminMenuItems = [
  { text: "Home", icon: HomeRoundedIcon, path: "/admin/home" },
  {
    text: "Agendamiento",
    icon: CalendarMonthRoundedIcon,
    path: "/admin/agendamiento",
  },
  { text: "Usuarios", icon: PeopleAltRoundedIcon, path: "/admin/usuarios" },
  {
    text: "Pacientes",
    icon: AccessibleForwardRoundedIcon,
    path: "/admin/pacientes",
  },
  { text: "Médicos", icon: MedicalServicesRoundedIcon, path: "/admin/medicos" },
  { text: "Ventas", icon: ShoppingCartRoundedIcon, path: "/admin/ventas" },
  { text: "Productos", icon: CategoryRoundedIcon, path: "/admin/productos" },
  { text: "Reportes", icon: AssessmentRoundedIcon, path: "/admin/reportes" },
];

export const secretarioMenuItems = [
  { text: "Home", icon: HomeRoundedIcon, path: "/admin/home" },
  {
    text: "Agendamiento",
    icon: CalendarMonthRoundedIcon,
    path: "/admin/agendamiento",
  },
  { text: "Ventas", icon: ShoppingCartRoundedIcon, path: "/admin/ventas" },
];

export const medicoMenuItems = [
  { text: "Home", icon: HomeRoundedIcon, path: "/admin/home" },
  {
    text: "Pacientes",
    icon: AccessibleForwardRoundedIcon,
    path: "/admin/pacientes",
  },
];

export const commonSecondaryMenuItems = [
  { text: "Settings", icon: SettingsRoundedIcon, path: "/admin/settings" },
];
