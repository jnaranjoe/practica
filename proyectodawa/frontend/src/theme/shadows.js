import { createTheme, alpha } from "@mui/material/styles";
import { gray } from "./themePrimitives";

const defaultTheme = createTheme();

const customShadows = [...defaultTheme.shadows];

// Modify the first shadow (index 1) dynamically based on mode (handled in getDesignTokens)
customShadows[1] =
  "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px";

export default customShadows;
