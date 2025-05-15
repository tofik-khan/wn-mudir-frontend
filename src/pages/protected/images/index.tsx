import { HideImage } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { UploadImageModal } from "@/pages/protected/modals/UploadImageModal";

export const PageImageLibrary = () => {
  const data = []; //temp until routes are created
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);

  if (data.length < 1) {
    // Return empty page
    return (
      <>
        <Typography variant="h2">Mudir Image Library</Typography>
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
          <Button
            variant="contained"
            onClick={() => setOpenUploadImageModal(true)}
            sx={{ my: 2 }}
          >
            Upload Image
          </Button>
        </Box>
        <UploadImageModal
          open={openUploadImageModal}
          onClose={() => setOpenUploadImageModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <Box>Images</Box>
    </>
  );
};
