import { Box } from "@mui/material";
import { EmptyImageContainer } from "./EmptyImageContainer";

export const WaqfeArdhiThumbnails = () => {
  const data = []; //temp until routes are created

  if (data.length < 1) {
    // Return empty page
    return <EmptyImageContainer />;
  }

  return (
    <>
      <Box>
        <h3>WaqfeArdhi Thumbnails</h3>
      </Box>
    </>
  );
};
