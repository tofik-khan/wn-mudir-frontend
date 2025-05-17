import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";

export const PageProjects = () => {
  const navigate = useNavigate();
  const data = []; // temporary empty data

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
      renderCell: ({ row }) => row.index,
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ row }) => <Typography>{row.title}</Typography>,
      flex: 3,
    },
    {
      field: "subtitle",
      headerName: "SubTitle",
      renderCell: ({ row }) => <Typography>{row.subTitle}</Typography>,
      flex: 3,
    },
    {
      field: "duration",
      headerName: "Duration",
      renderCell: ({ row }) => <Typography>{row.duration}</Typography>,
      flex: 3,
    },
    {
      field: "audience",
      headerName: "Audience",
      renderCell: ({ row }) => <Typography>{row.audience}</Typography>,
      flex: 3,
    },
    {
      field: "slug",
      headerName: "Slug",
      renderCell: ({ row }) => <Typography>{row.description}</Typography>,
      flex: 3,
    },
    {
      field: "sponsor",
      headerName: "Sponsor",
      renderCell: ({ row }) => <Typography>{row.sponsor}</Typography>,
      flex: 3,
    },
    {
      field: "badge",
      headerName: "Badge",
      renderCell: ({ row }) => <Typography>{row.title}</Typography>,
      flex: 1,
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 3, my: 1 }}
      >
        <Typography variant="h2">Waqf-e-Ardhi Projects</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/protected/waqfeardhi/projects/new")}
        >
          <Add />
          Create Project
        </Button>
      </Box>
      <DataGridPro
        rows={data}
        columns={columns}
        disableColumnMenu
        disableColumnResize
        sx={{
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
