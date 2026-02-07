import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useImageKitGetFolderAssets } from "@/queries/mudir/images";
import { waqfeArdhiFolders } from "@/constants";
import { Gallery } from "@/components/Gallery";

export const ThumbnailModals = ({
  open,
  onClose,
  onClick,
}: {
  open: boolean;
  onClose: any;
  onClick: any;
}) => {
  const folder = waqfeArdhiFolders[0];
  const { data, isLoading } = useImageKitGetFolderAssets({
    folder,
  });
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
        <DialogTitle>Select Project Thumbnail</DialogTitle>
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
        <DialogContent
          dividers
          sx={{
            pl: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Gallery data={data} onClick={onClick} onClose={onClose} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
