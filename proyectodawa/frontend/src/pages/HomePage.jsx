// src/pages/HomePage.jsx
import React from "react";
import {
  Box,
  Typography,
  CssBaseline,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@mui/material";
import AppTheme from "../theme/AppTheme";
import AppBarHome from "../components/AppBarHome";
import StyleBack from "../theme/StyleBack";

import imgFisica from "@/assets/Terapia_fisica.jpg";
import imgOcupacional from "@/assets/terapia_ocupacional.jpg";
import imgDoctora from "@/assets/doctora.jpg";
import imgDoctor from "@/assets/doctor.jpg";
import imgDoctoramujer from "@/assets/doctormujer.jpg";
import imgPrimera from "@/assets/Primera_Sede.jpeg";
import imgSegunda from "@/assets/Segunda_sede.jpeg";
import imgTercera from "@/assets/Tercera_sede.jpeg";

import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

export default function HomePage({ disableCustomTheme }) {
  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline />
      <AppBarHome />
      <StyleBack>
        <Box
          sx={{
            pt: { xs: "80px", sm: "100px" },
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          {/* Inicio */}
          <Box id="inicio" sx={{ textAlign: "center", p: 4 }}>
            <Typography variant="h3" fontWeight="bold">
              Bienvenidos a XYZ Terapias
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Recupera tu bienestar con nosotros
            </Typography>
          </Box>

          {/* Servicios */}
          <Box id="servicios" p={4}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Nuestros Servicios
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {[
                { titulo: "Terapia Física", imagen: imgFisica },
                { titulo: "Terapia Alternativa", imagen: imgOcupacional },
              ].map(({ titulo, imagen }) => (
                <Grid item xs={12} md={5} key={titulo}>
                  <Card sx={{ border: "1px #2E86C1", borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={imagen}
                      alt={titulo}
                    />
                    <CardContent>
                      <Typography align="center">{titulo}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Equipo */}
          <Box id="equipo" p={4}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Nuestro Equipo
            </Typography>
            <Typography
              variant="body2"
              align="center"
              mb={3}
              sx={{ color: "#9B9898" }}
            >
              Profesionales altamente calificados comprometidos con tu
              recuperación
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {[
                {
                  nombre: "Dra. Maria Gonzalez",
                  rol: "Fisioterapeuta",
                  experiencia: "10 años",
                  imagen: imgDoctora,
                },
                {
                  nombre: "Dr. Juan Cedeño",
                  rol: "Terapeuta Alternativa",
                  experiencia: "15 años",
                  imagen: imgDoctor,
                },
                {
                  nombre: "Dra. Sara Rivadeneira",
                  rol: "Fisioterapeuta",
                  experiencia: "5 años",
                  imagen: imgDoctoramujer,
                },
              ].map(({ nombre, rol, experiencia, imagen }) => (
                <Grid item xs={12} md={3} key={nombre}>
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 2,
                      border: "1px #ccc",
                      borderRadius: 2,
                    }}
                  >
                    <Avatar
                      alt={nombre}
                      src={imagen}
                      sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{nombre}</Typography>
                      <Typography variant="body2" sx={{ color: "#062349" }}>
                        {rol}
                      </Typography>
                      <Typography variant="body2">
                        {experiencia} de experiencia
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Sedes */}
          <Box id="sedes" p={4}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Nuestras Sedes
            </Typography>
            <Typography
              variant="body2"
              align="center"
              mb={3}
              sx={{ color: "#9B9898" }}
            >
              Encuentra la sede más cercana a ti...
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {[
                {
                  nombre: "Sede Centro",
                  direccion: "Calle 25 y la cuarta",
                  telefono: "0987654321",
                  horario: "Lun-Sab :7:00 - 19:00",
                  servicios: ["Terapia Física", "Terapia Alternativa"],
                  imagen: imgPrimera,
                },
                {
                  nombre: "Sede Norte",
                  direccion: "Calle 25 y la cuarta",
                  telefono: "0987654321",
                  horario: "Lun-Sab :7:00 - 19:00",
                  servicios: ["Terapia Física", "Terapia Alternativa"],
                  imagen: imgSegunda,
                },
                {
                  nombre: "Sede Sur",
                  direccion: "Calle 25 y la cuarta",
                  telefono: "0987654321",
                  horario: "Lun-Sab :7:00 - 19:00",
                  servicios: ["Terapia Física", "Terapia Alternativa"],
                  imagen: imgTercera,
                },
              ].map(
                ({
                  nombre,
                  direccion,
                  telefono,
                  horario,
                  servicios,
                  imagen,
                }) => (
                  <Grid item xs={12} md={4} key={nombre}>
                    <Card sx={{ border: "1px #2E86C1", borderRadius: 2 }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={imagen}
                        alt={nombre}
                      />
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                          {nombre}
                        </Typography>
                        <Typography variant="body2">
                          <PlaceIcon fontSize="small" sx={{ mr: 1 }} />
                          {direccion}
                        </Typography>
                        <Typography variant="body2">
                          <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                          {telefono}
                        </Typography>
                        <Typography variant="body2">
                          <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                          {horario}
                        </Typography>
                        <Typography variant="body2" mt={1} fontWeight="bold">
                          Servicios disponibles:
                        </Typography>
                        <ul>
                          {servicios.map((s) => (
                            <li key={s}>
                              <Typography variant="body2">{s}</Typography>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Box>

          {/* Paquetes */}
          <Box id="paquetes" p={4}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Nuestros Paquetes
            </Typography>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ maxWidth: 700, margin: "0 auto" }}
            >
              {[
                { tipo: "Fisioterapia", sesiones: 5, precio: 50 },
                { tipo: "Fisioterapia", sesiones: 10, precio: 100 },
                { tipo: "Fisioterapia", sesiones: 15, precio: 150 },
                { tipo: "Terapia Alternativa", sesiones: 5, precio: 20 },
                { tipo: "Terapia Alternativa", sesiones: 10, precio: 40 },
                { tipo: "Terapia Alternativa", sesiones: 15, precio: 60 },
              ].map(({ tipo, sesiones, precio }, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ textAlign: "center", borderRadius: 2 }}>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "#133751" }}
                      >
                        {tipo}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: "#737272" }}
                      >
                        {sesiones} Sesiones por:
                      </Typography>
                    </CardContent>
                    <Box sx={{ backgroundColor: "#6b8c87", py: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#062349"
                      >
                        ${precio}
                      </Typography>
                    </Box>
                    <CardContent>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: "#062349" }}
                      >
                        Duración: 30 min/Sesión
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Contacto */}
          <Box id="contactenos" p={4}>
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Contactenos
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <PhoneIcon sx={{ mr: 1 }} />
                0999999999
              </Grid>
              <Grid item>
                <RoomIcon sx={{ mr: 1 }} />
                Calle 23 y la cuarta
              </Grid>
              <Grid item>
                <EmailIcon sx={{ mr: 1 }} />
                xyz@gmail.com
              </Grid>
              <Grid item>
                <AccessTimeIcon sx={{ mr: 1 }} />
                Lun-Sab: 7:00-19:00
              </Grid>
            </Grid>
          </Box>
        </Box>
      </StyleBack>
    </AppTheme>
  );
}
