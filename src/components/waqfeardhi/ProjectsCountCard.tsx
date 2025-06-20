import { useProjectsCountQuery } from "@/queries/waqfeardhi/dashboard";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export const ProjectsCountCard = () => {
  const { data: count, isLoading } = useProjectsCountQuery();

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
          height: "100px",
          mr: 2,
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
            <Typography variant="overline">Total Applications</Typography>
            <Typography variant="h4" fontWeight={"bold"}>
              {count}
            </Typography>
          </>
        )}
      </Paper>
    </>
  );
};
