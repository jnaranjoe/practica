import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import logo from "../assets/logo.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppBarHome() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const handleInicioClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = ["Servicios", "Equipo", "Sedes", "Paquetes", "Contáctenos"];
  const textColor = isDarkMode ? "common.white" : "common.black";

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 32 }} />
            <Box
              sx={{
                fontWeight: "bold",
                color: textColor,
                fontSize: "1.35rem",
              }}
            >
              Xyz
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              variant="text"
              sx={{ color: textColor }}
              onClick={handleInicioClick}
            >
              Inicio
            </Button>
            {navItems.map((item) => (
              <Button
                key={item}
                variant="text"
                sx={{ color: textColor }}
                onClick={() => scrollToSection(item)}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <ColorModeIconDropdown />
          </Box>

          {/* Menú móvil */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton onClick={toggleDrawer(true)} aria-label="Menú">
              <MenuIcon sx={{ color: textColor }} />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <MenuItem onClick={handleInicioClick}>Inicio</MenuItem>
          {navItems.map((item) => (
            <MenuItem
              key={item}
              onClick={() => {
                scrollToSection(item);
                setOpen(false); // Cierra el drawer luego de hacer scroll
              }}
            >
              {item}
            </MenuItem>
          ))}
          <Divider sx={{ my: 2 }} />
        </Box>
      </Drawer>
    </AppBar>
  );
}
