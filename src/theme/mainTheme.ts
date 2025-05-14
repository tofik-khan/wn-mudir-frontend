import { createTheme } from "@mui/material";
import { colors } from "@/lib/colors";

export const theme = createTheme({
  palette: colors,
  typography: {
    h2: {
      fontFamily: "Fraunces,Georgia,Times,serif",
      fontWeight: "bold",
      fontSize: "24px",
      marginBottom: "8px",
    },
  },
});