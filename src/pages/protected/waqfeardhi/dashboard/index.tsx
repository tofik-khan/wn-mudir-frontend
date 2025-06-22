import { ApplicationsCountPerMonthChart } from "@/components/waqfeardhi/ApplicationPerMonthChart";
import { ApplicationsCountByAuxiliaryChart } from "@/components/waqfeardhi/ApplicationsCountByAuxiliaryChart";
import { ApplicationsCountCard } from "@/components/waqfeardhi/ApplicationsCountCard";
import { CompletedApplicationsCountCard } from "@/components/waqfeardhi/CompletedApplicationsCountCard";
import { ProjectsCountCard } from "@/components/waqfeardhi/ProjectsCountCard";
import { StatusCountCard } from "@/components/waqfeardhi/StatusCountCard";
import { Grid, Paper, Typography } from "@mui/material";

export const PageWaqfeardhiDashboard = () => {
  return (
    <>
      <Paper
        sx={(theme) => ({
          padding: 2,
          backgroundColor: theme.palette.primary.main,
          background: `linear-gradient(135deg, #6A0136, #2B0117)`,
          height: "100px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Typography variant="h2" color="white">
          Waqf-e-Ardhi - وقفِ عارضی
        </Typography>
      </Paper>
      <Grid container my={2} gap={2} wrap={"nowrap"}>
        <Grid size={2}>
          <ProjectsCountCard />
        </Grid>
        <Grid size={2}>
          <ApplicationsCountCard />
        </Grid>
        <Grid size={2}>
          <StatusCountCard status={"pending"} title={"Pending"} />
        </Grid>
        <Grid size={2}>
          <StatusCountCard status={"in-progress"} title={"In Progress"} />
        </Grid>
        <Grid size={2}>
          <CompletedApplicationsCountCard />
        </Grid>
        <Grid size={2}>
          <ProjectsCountCard />
        </Grid>
      </Grid>
      <Grid container my={2} gap={2} wrap={"nowrap"}>
        <Grid size={4}>
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              height: "450px",
            }}
          >
            <Typography variant="overline">Applications/Aux</Typography>
            <ApplicationsCountByAuxiliaryChart />
          </Paper>
        </Grid>
        <Grid size={8}>
          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              height: "450px",
            }}
          >
            <Typography variant="overline">Applications/Month</Typography>
            <ApplicationsCountPerMonthChart />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
