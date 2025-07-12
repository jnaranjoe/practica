// src/pages/SignIn.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import ForgotPassword from "../components/ForgotPassword";
import AppTheme from "../theme/AppTheme";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import StyleBack from "../theme/StyleBack";
import logo from "../assets/logo.png";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles?.("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignIn({ disableCustomTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();

  const [openForgot, setOpenForgot] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    await login(email, password);
  };

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <StyleBack direction="column" justifyContent="space-between">
        <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
          <ColorModeIconDropdown />
        </Box>

        <Card variant="outlined">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 80,
              height: 80,
              marginBottom: 2,
              alignSelf: "center",
            }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
            }}
          >
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {/* El Alert ahora muestra el error del estado global del contexto */}
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}
            <FormControl>
              <FormLabel htmlFor="email">Correo electrónico</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <TextField
                id="password"
                name="password"
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar sesión"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Entrar"}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={() => setOpenForgot(true)}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Card>

        <ForgotPassword
          open={openForgot}
          handleClose={() => setOpenForgot(false)}
        />
      </StyleBack>
    </AppTheme>
  );
}
