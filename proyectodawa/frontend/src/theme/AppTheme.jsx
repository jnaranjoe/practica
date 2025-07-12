import * as React from "react";
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import { getDesignTokens, colorSchemes } from "./colorSchemes";

export const ColorModeContext = React.createContext();

export default function AppTheme({ children, disableCustomTheme = false }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = React.useMemo(() => {
    if (disableCustomTheme) {
      return createTheme();
    }

    const designTokens = getDesignTokens(mode);
    const paletteOverrides = colorSchemes[mode]?.palette || {};

    return createTheme({
      ...designTokens,
      palette: {
        ...designTokens.palette,
        ...paletteOverrides,
      },
      shape: designTokens.shape,
      shadows: designTokens.shadows,
      typography: designTokens.typography,
    });
  }, [mode, disableCustomTheme]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
