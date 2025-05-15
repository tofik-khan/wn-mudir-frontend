import { HideImage } from "@mui/icons-material";
import { Typography, Box, Button } from "@mui/material";
import { UploadImageModal } from "../modals/UploadImageModal";
import { useState } from "react";

export const EmptyImageContainer = () => {
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);
  return (
    <>
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
};
