import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { Close, HideImage } from "@mui/icons-material";
import { useImageKitGetFolderAssets } from "@/queries/mudir/images";
import { waqfeArdhiFolders } from "@/constants";

const Gallery = ({ data, onClick, onClose }) => {
  if (data.length < 1) {
    return (
      <>
        <HideImage
          sx={(theme) => ({
            width: "100px",
            height: "100px",
            color: theme.palette.action.focus,
            my: 2,
          })}
        />
        <Typography variant="h3">No Images Available</Typography>
      </>
    );
  }

  return (
    <>
      <Box sx={{ margin: "auto" }}>
        <ImageList sx={{ width: "100%" }} cols={4}>
          {data.map((item) => (
            <ImageListItem
              key={item.fileId}
              sx={(theme) => ({
                width: "200px",
                height: "150px",
                my: 2,
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: "4px",
              })}
              onClick={() => {
                onClick(item.url);
                onClose();
              }}
            >
              <img src={`${item.thumbnail}`} alt={item.name} loading="lazy" />
              <ImageListItemBar
                position="below"
                sx={(theme) => ({
                  background: theme.palette.grey[400] + "44",
                  padding: 1,
                  mt: 1,
                })}
                title={item.name}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
};

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
