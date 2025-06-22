import { useApplicationsPerMonthQuery } from "@/queries/waqfeardhi/dashboard";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import { useState } from "react";

export const ApplicationsCountPerMonthChart = () => {
  const { data, isLoading } = useApplicationsPerMonthQuery();
  const [activeSlice, setActiveSlice] = useState<number>(-12);

  if (isLoading || !data) {
    return (
      <>
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
      </>
    );
  }

  const displayData = data.slice(activeSlice);

  return (
    <>
      <Stack direction={"row"} gap={1}>
        <Chip
          variant={activeSlice === 0 ? "filled" : "outlined"}
          label="All Time"
          onClick={() => setActiveSlice(0)}
          sx={{ "&hover": { cursor: "pointer" } }}
        />
        <Chip
          variant={activeSlice === -12 ? "filled" : "outlined"}
          label="Last 12 months"
          onClick={() => setActiveSlice(-12)}
          sx={{ "&hover": { cursor: "pointer" } }}
        />
        <Chip
          variant={activeSlice === -6 ? "filled" : "outlined"}
          label="Last 6 months"
          onClick={() => setActiveSlice(-6)}
          sx={{ "&hover": { cursor: "pointer" } }}
        />
      </Stack>
      <LineChart
        height={400}
        series={[{ data: displayData.map((object) => object.value) }]}
        xAxis={[
          {
            data: displayData.map((object) =>
              dayjs(object.label).format("MMM YY")
            ),
            scaleType: "point",
          },
        ]}
      />
    </>
  );
};
