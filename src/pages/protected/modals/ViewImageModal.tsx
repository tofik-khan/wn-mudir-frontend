import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const ViewImageModal = ({ open, onClose, files, defaultIndex }) => {
  const [index, setIndex] = useState(defaultIndex || 0);

  const file = files[index];

  const getNextIndex = (current, length) => {
    return (current + 1) % length;
  };

  const getPrevIndex = (current, length) => {
    const index = (current - 1) % length;
    return index < 0 ? length - 1 : index;
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography
            sx={{
              maxWidth: "300px",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {file.name}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Close />
        </IconButton>
        <DialogContent dividers sx={{ height: "60vh" }}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              src={file.url}
              width={500}
              height={500}
              style={{ objectFit: "contain", margin: "auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton
              color="primary"
              onClick={() => setIndex(getPrevIndex(index, files.length))}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setIndex(getNextIndex(index, files.length))}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
