import { useApplicationsCountByAuxiliaryQuery } from "@/queries/waqfeardhi/dashboard";
import { Box, CircularProgress } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export const ApplicationsCountByAuxiliaryChart = () => {
  const { data, isLoading } = useApplicationsCountByAuxiliaryQuery();

  if (isLoading || !data) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return <PieChart series={[{ data, innerRadius: 75 }]} />;
};
