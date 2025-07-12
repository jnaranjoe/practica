// src/components/NavbarBreadcrumbs.jsx
import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom"; // Importa useLocation y Link
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link"; // Para los links de Material-UI
import { styled } from "@mui/material/styles"; // Para StyledBreadcrumbs

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    color: theme.palette.text.secondary,
  },
  "& .MuiLink-root": {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const breadcrumbNameMap = {
  "/admin": "Dashboard",
  "/admin/home": "Home",
  "/admin/usuarios": "Usuarios",
  "/admin/pacientes": "Pacientes",
  "/admin/medicos": "Médicos",
  "/admin/reportes": "Reportes",
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <MuiLink component={RouterLink} to="/admin">
        <Typography
          variant="body1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Dashboard
        </Typography>
      </MuiLink>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        let name = breadcrumbNameMap[to];

        if (value === "admin" && to === "/admin") {
          return null;
        }
        if (value === "home" && to === "/admin/home") {
          name = "Home";
        }

        if (!name) {
          name = value.charAt(0).toUpperCase() + value.slice(1);
        }

        return last ? (
          <Typography
            variant="body1"
            key={to}
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {name}
          </Typography>
        ) : (
          <MuiLink component={RouterLink} to={to} key={to}>
            <Typography variant="body1">{name}</Typography>
          </MuiLink>
        );
      })}
    </StyledBreadcrumbs>
  );
}
