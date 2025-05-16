import {
  Alert,
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Snackbar,
  Typography,
} from "@mui/material";
import { EmptyImageContainer } from "./EmptyImageContainer";
import { useImageKitGetFolderAssets } from "@/queries/mudir/images";
import { Folder } from "@/types/images";
import { Loading } from "@/components/Loading";
import { Info, Upload } from "@mui/icons-material";
import { useState } from "react";
import { UploadImageModal } from "../modals/UploadImageModal";

export const Gallery = ({
  folder,
  title,
}: {
  folder: Folder;
  title: string;
}) => {
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const { data, isLoading, isRefetching } = useImageKitGetFolderAssets({
    folder,
  });

  if (isLoading || isRefetching) return <Loading />;

  if (data.length < 1) {
    // Return empty page
    return <EmptyImageContainer />;
  }

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3">{title}</Typography>
          <Button
            variant="contained"
            onClick={() => setOpenUploadImageModal(true)}
            sx={{ my: 2 }}
            startIcon={<Upload />}
          >
            Upload
          </Button>
        </Box>

        <ImageList sx={{ width: "100%" }} cols={7}>
          {data.map((item) => (
            <ImageListItem
              key={item.fileId}
              sx={{ width: "200px", height: "200px" }}
            >
              <img src={`${item.thumbnail}`} alt={item.name} loading="lazy" />
              <ImageListItemBar
                title={item.name}
                subtitle={`${(item.size / (1024 * 1024)).toFixed(2)}MB`}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <Info />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <UploadImageModal
        open={openUploadImageModal}
        onClose={() => setOpenUploadImageModal(false)}
        onSuccess={() => setOpenSuccessSnackbar(true)}
      />
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Image Uploaded!
        </Alert>
      </Snackbar>
    </>
  );
};
