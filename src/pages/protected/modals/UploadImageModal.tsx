import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  LinearProgress,
  Box,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/react";
import { Close, CloudUpload } from "@mui/icons-material";
import { useImageKitAuthQuery } from "@/queries/mudir/images";
import { useState } from "react";
import { Loading } from "@/components/Loading";
import { waqfeArdhiFolders, expoFolders } from "@/constants";

export const UploadImageModal = ({ open, onClose }) => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [error, setError] = useState({
    open: false,
    message: "",
  });
  const [folder, setFolder] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState(0);
  const { data: imageKitAuth, isLoading: isLoadingAuth } =
    useImageKitAuthQuery();

  const handleUpload = async () => {
    if (!files || files?.length < 1) {
      setError({ open: true, message: "Select an image to upload" });
      return;
    }

    if (!imageKitAuth) {
      setError({
        open: true,
        message:
          "Auth Failed! This is an issue with the application. Contact Support",
      });
      return;
    }

    if (folder.length < 1) {
      setError({
        open: true,
        message: "Select a folder to upload the file",
      });
      return;
    }

    const file = files[0];

    const { signature, expire, token } = imageKitAuth;
    console.log(file);
    console.log(folder);

    try {
      const uploadResponse = await upload({
        signature,
        expire,
        token,
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
        fileName: file.name,
        folder,
        file,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });
      if (uploadResponse.$ResponseMetadata.statusCode === 200) {
        setFiles(null);
        setFolder("");
        onClose();
        setOpenSuccessSnackbar(true);
      } else {
        setError({
          open: true,
          message:
            "Response != 200! This is an issue with the application. Contact Support",
        });
        return;
      }
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        setError({ open: true, message: `Upload aborted: ${error.reason}` });
      } else if (error instanceof ImageKitInvalidRequestError) {
        setError({ open: true, message: `Invalid request: ${error.message}` });
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError({ open: true, message: `Network Error: ${error.message}` });
      } else if (error instanceof ImageKitServerError) {
        setError({ open: true, message: `Server Error: ${error.message}` });
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setFiles(null);
          setFolder("");
          onClose();
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle>Upload Image</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setFiles(null);
            setFolder("");
            onClose();
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          {isLoadingAuth ? (
            <Loading />
          ) : (
            <Box>
              <Box>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <InputLabel htmlFor="images-folder-selection">
                    Folder
                  </InputLabel>
                  <Select
                    labelId="images-folder-selection"
                    id="images-folder-selection"
                    value={folder}
                    label="Folder"
                    onChange={(event) => setFolder(event.target.value)}
                  >
                    <ListSubheader>Waqf-e-Ardhi</ListSubheader>
                    {waqfeArdhiFolders.map((folder) => (
                      <MenuItem value={folder.value}>{folder.label}</MenuItem>
                    ))}
                    <ListSubheader>Expo</ListSubheader>
                    {expoFolders.map((folder) => (
                      <MenuItem value={folder.value}>{folder.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {
                <Box sx={{ my: 2 }}>
                  {files && files?.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          width: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textWrap: "nowrap",
                        }}
                      >
                        {files[0].name}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ width: "100%" }}
                      />
                    </Box>
                  ) : (
                    "No files selected"
                  )}
                </Box>
              }
              <Box
                sx={{ my: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Select Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => setFiles(event.target.files)}
                  />
                </Button>
                <Button
                  disabled={!files || files.length < 1}
                  variant="contained"
                  onClick={() => handleUpload()}
                >
                  Upload Image
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
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
      <Snackbar
        open={error.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setError({ open: false, message: "" })}
      >
        <Alert
          onClose={() => setError({ open: false, message: "" })}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </>
  );
};
