import { Loading } from "@/components/Loading";
import { useApplicantsQuery } from "@/queries/waqfeardhi/applicants";
import { Box, Tooltip, Typography } from "@mui/material";
import { DataGridPro, GridColDef, gridClasses } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { useNavigate } from "react-router";

export const PageApplicants = () => {
  const { data, isLoading } = useApplicantsQuery();
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  if (isLoading) return <Loading />;

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
        </Box>
      ),
      width: 200,
    },
    {
      field: "membercode",
      headerName: "ID #",
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
            {row.membercode}
          </Typography>
        </Box>
      ),
      width: 100,
    },
    {
      field: "jammat",
      headerName: "Jammat",
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
            {row.jammat}
          </Typography>
        </Box>
      ),
      width: 150,
    },
    {
      field: "auxiliary",
      headerName: "Auxiliary",
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
            {row.auxiliary}
          </Typography>
        </Box>
      ),
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
          <Tooltip title={<Typography>{row.comments}</Typography>} arrow>
            <Typography
              sx={{
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {row.comments}
            </Typography>
          </Tooltip>
        </Box>
      ),
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
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
      width: 200,
    },
    {
      field: "timestamp",
      headerName: "Submission Date/Time",
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
            {row.timestamp}
          </Typography>
        </Box>
      ),
      width: 200,
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
      flex: 1,
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "left", mx: 3, my: 1 }}>
        <Typography variant="h2">Waqf-e-Ardhi Applicants</Typography>
      </Box>
      <DataGridPro
        loading={isLoading}
        rows={data?.map((applicant, index) => ({
          ...applicant,
          index: index + 1,
        }))}
        rowHeight={100}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowClick={({ row }) =>
          navigate(`/protected/waqfeardhi/applicants/${row._id}`)
        }
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
