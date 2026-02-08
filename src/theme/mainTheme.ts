import { createTheme } from "@mui/material";
import { colors } from "@/lib/colors";
import type {} from "@mui/x-date-pickers-pro/themeAugmentation";

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
  components: {
    MuiDatePicker: {
      defaultProps: {
        displayWeekNumber: true,
      },
    },
    MuiDateRangeCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
        },
      },
    },
  },
});
