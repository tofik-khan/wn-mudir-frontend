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
import { Gallery } from "./Gallery";

export const PageImageLibrary = () => {
  const folders = [...waqfeArdhiFolders, ...expoFolders];
  const [folder, setFolder] = useState(folders[0]);

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel htmlFor="images-folder-selection">Folder</InputLabel>
          <Select
            labelId="images-folder-selection"
            id="images-folder-selection"
            value={folder.id}
            label="Folder"
            onChange={(event) =>
              setFolder(
                folders.find((folder) => folder.id === event.target.value) ||
                  folders[0]
              )
            }
            defaultValue={folder.id}
          >
            <ListSubheader>Waqf-e-Ardhi</ListSubheader>
            {waqfeArdhiFolders.map((folder) => (
              <MenuItem key={folder.id} value={folder.id}>
                {folder.label}
              </MenuItem>
            ))}
            <ListSubheader>Expo</ListSubheader>
            {expoFolders.map((folder) => (
              <MenuItem key={folder.id} value={folder.id}>
                {folder.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Gallery folder={folder} title={folder.title} />
      </Box>
    </>
  );
};
