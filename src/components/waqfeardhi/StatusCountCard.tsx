import { useApplicationsByStatusQuery } from "@/queries/waqfeardhi/dashboard";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export const StatusCountCard = ({ title, status }) => {
  const { data: count, isLoading } = useApplicationsByStatusQuery(status);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
          height: "100px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="overline">{title}</Typography>
            <Typography variant="h4" fontWeight={"bold"}>
              {count}
            </Typography>
          </>
        )}
      </Paper>
    </>
  );
};
