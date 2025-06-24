import { useImageKitUsageQuery } from "@/queries/mudir/dashboard";
import { formatBytes } from "@/utils";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export const ImageKitBandwidthUsage = () => {
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
          <Typography variant="overline">Bandwidth</Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {formatBytes(data.usage.bandwidthBytes)}&nbsp;
            <Typography component={"span"} color="text.secondary">
              / Month
            </Typography>
          </Typography>
        </>
      )}
    </Paper>
  );
};
