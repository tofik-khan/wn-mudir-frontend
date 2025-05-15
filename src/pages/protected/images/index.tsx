import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { waqfeArdhiFolders, expoFolders } from "@/constants";
import { WaqfeArdhiThumbnails } from "./WaqfeArdhiThumbnails";

const ImageGalleryContent = ({ folder }) => {
  switch (folder) {
    case "/waqfeardhi/thumbnails":
      return <WaqfeArdhiThumbnails />;
    default:
      <p>Something went wrong</p>;
      break;
  }
};

export const PageImageLibrary = () => {
  const [folder, setFolder] = useState(waqfeArdhiFolders[0].value);

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel htmlFor="images-folder-selection">Folder</InputLabel>
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
        <ImageGalleryContent folder={folder} />
      </Box>
    </>
  );
};
