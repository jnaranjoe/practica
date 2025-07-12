// src/theme/StyleBack.jsx
import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const StyledBackground = styled(Stack)(({ theme }) => ({
  minHeight: "100vh", // cubre todo el viewport
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles?.("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function StyleBack({ children, ...props }) {
  return (
    <StyledBackground
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      {...props}
    >
      {children}
    </StyledBackground>
  );
}
