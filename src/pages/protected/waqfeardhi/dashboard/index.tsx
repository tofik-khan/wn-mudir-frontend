import { ApplicationsCountCard } from "@/components/waqfeardhi/ApplicationsCountCard";
import { CompletedApplicationsCountCard } from "@/components/waqfeardhi/CompletedApplicationsCountCard";
import { ProjectsCountCard } from "@/components/waqfeardhi/ProjectsCountCard";
import { Grid, Paper, Typography } from "@mui/material";

export const PageWaqfeardhiDashboard = () => {
  return (
    <>
      <Grid container my={2}>
        <Grid size={8}>
          <Paper
            sx={(theme) => ({
              padding: 2,
              backgroundColor: theme.palette.primary.main,
              background: `linear-gradient(135deg, #6A0136, #2B0117)`,
              height: "100px",
              mr: 2,
            })}
          >
            <Typography variant="overline" color="white">
              Waqf-e-Ardhi
            </Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper
            sx={(theme) => ({
              padding: 2,
              backgroundColor: theme.palette.primary.main,
              background: `linear-gradient(135deg, #6A0136, #2B0117)`,
              height: "100px",
            })}
          >
            <Typography variant="overline" color="white">
              Side
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container my={2}>
        <Grid size={4}>
          <ApplicationsCountCard />
        </Grid>
        <Grid size={4}>
          <ProjectsCountCard />
        </Grid>
        <Grid size={4}>
          <CompletedApplicationsCountCard />
        </Grid>
      </Grid>
      <Grid container my={2}>
        <Grid size={4}>
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              height: "300px",
              mr: 2,
            }}
          >
            Pie Graph
          </Paper>
        </Grid>
        <Grid size={8}>
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              height: "300px",
            }}
          >
            Line Graph
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
