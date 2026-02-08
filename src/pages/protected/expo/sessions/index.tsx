import { LazyImage } from "@/components/LazyImage";
import { Loading } from "@/components/Loading";
import { useSessionsQuery } from "@/queries/expo/sessions";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";

export const PageExpoSessions = () => {
  const navigate = useNavigate();
  const { isLoading, isRefetching, data } = useSessionsQuery();

  if (isLoading || isRefetching) return <Loading />;

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      renderCell: ({ row }) => (
        <LazyImage
          src={row.thumbnail}
          defaultImage={""}
          style={{ width: "150px", height: "100px", objectFit: "cover" }}
        />
      ),
      width: 170,
    },
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ row }) => row.title,
      flex: 3,
    },
    {
      field: "date",
      headerName: "Date",
      renderCell: ({ row }) => row.date,
      flex: 2,
    },
    {
      field: "location",
      headerName: "Location",
      renderCell: ({ row }) => row.location,
      flex: 2,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      renderCell: ({ row }) => row.startTime,
      flex: 2,
    },
    {
      field: "endTime",
      headerName: "End Time",
      renderCell: ({ row }) => row.endTime,
      flex: 2,
    },
    {
      field: "presenters",
      headerName: "Presenters",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {row.presenters.map((presenter) => (
            <Typography key={presenter.value}>{presenter.label}</Typography>
          ))}
        </Box>
      ),
      flex: 2,
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 3, my: 1 }}
      >
        <Typography variant="h2">EXPO Sessions</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/protected/expo/sessions/new")}
        >
          <Add />
          Add Session
        </Button>
      </Box>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id ?? row.title}
        rowHeight={120}
        onRowClick={({ row }) => {
          navigate(`/protected/expo/sessions/${row._id}`);
        }}
        disableColumnMenu
        disableColumnResize
        sx={{
          marginBottom: 10,
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent",
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnSeparator}`]: {
            display: "none",
          },
          [`& .${gridClasses.row}`]: {
            "&:hover": {
              cursor: "pointer",
            },
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </>
  );
};
