import { Box, Typography } from "@mui/material";
import { DataGridPro, GridColDef, gridClasses } from "@mui/x-data-grid-pro";

export const PageApplicants = () => {
  const data = []; //temporary placeholder

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
      field: "name",
      headerName: "Applicant",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.firstname} {row.lastname}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            })}
          >
            {row.membercode}
          </Typography>
        </Box>
      ),
      flex: 2,
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Description
        </Box>
      ),
      flex: 3,
    },
    {
      field: "contact",
      headerName: "Contact",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.email}
          </Typography>
          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            })}
          >
            {row.phone}
          </Typography>
        </Box>
      ),
      width: 250,
    },
    {
      field: "slug",
      headerName: "Slug",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ width: "100%", textOverflow: "ellipsis", overflow: "hidden" }}
          >
            {row.slug}
          </Typography>
        </Box>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "left", mx: 3, my: 1 }}>
        <Typography variant="h2">Waqf-e-Ardhi Applicants</Typography>
      </Box>
      <DataGridPro
        loading={false}
        rows={data}
        rowHeight={100}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
        // onRowClick={({ row }) =>
        //   navigate(`/protected/waqfeardhi/projects/${row._id}`)
        // }
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
