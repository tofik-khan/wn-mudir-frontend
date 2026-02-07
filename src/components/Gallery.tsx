import { HideImage } from "@mui/icons-material";
import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

export const Gallery = ({ data, onClick, onClose }) => {
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
