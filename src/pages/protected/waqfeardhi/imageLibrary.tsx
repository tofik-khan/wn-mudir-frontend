import { HideImage } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export const PageWAimageLibrary = () => {
  const data = []; //temp until routes are created

  if (data.length < 1) {
    // Return empty page
    return (
      <>
        <Typography variant="h2">Waqf-e-Ardhi Image Library</Typography>
        <Box
          sx={() => ({
            width: "100%",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <HideImage
            sx={(theme) => ({
              width: "100px",
              height: "100px",
              color: theme.palette.action.focus,
              my: 2,
            })}
          />
          <Typography variant="h3">No Images Available</Typography>
          <Button variant="contained">Upload Image</Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box>Images</Box>
    </>
  );
};
