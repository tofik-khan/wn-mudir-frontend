import { useImageKitUsageQuery } from "@/queries/mudir/dashboard";
import { formatBytes } from "@/utils";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export const ImageKitStorageUsage = () => {
  const { data, isLoading } = useImageKitUsageQuery();

  return (
    <Paper sx={{ padding: 2, height: "50%" }} variant="outlined">
      {isLoading || !data ? (
        <Box
          sx={{
            widht: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="overline">Image Storage Used</Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {formatBytes(data.usage.mediaLibraryStorageBytes)}&nbsp;
            <Typography component={"span"} color="text.secondary">
              / 25 GB
            </Typography>
          </Typography>
        </>
      )}
    </Paper>
  );
};
