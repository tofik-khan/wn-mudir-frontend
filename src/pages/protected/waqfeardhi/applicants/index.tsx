import { Loading } from "@/components/Loading";
import { ApplicationStatusChip } from "@/components/waqfeardhi/ApplicationStatusChip";
import { useApplicantsQuery } from "@/queries/waqfeardhi/applicants";
import { Applicant } from "@/types/waqfeardhi";
import { Box, Tooltip, Typography } from "@mui/material";
import { DataGridPro, GridColDef, gridClasses } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
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

  const columns: GridColDef<Applicant>[] = [
    {
      field: "name",
      headerName: "Applicant",
      valueGetter: (_, row) => {
        return `${row.firstname} ${row.lastname}`;
      },
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
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <ApplicationStatusChip status={row.status} />
        </Box>
      ),
      width: 120,
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
            {dayjs(row.timestamp).format("MM/DD/YY HH:mm a")}
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
        rows={data}
        rowHeight={60}
        columns={columns}
        getRowId={(row) => row._id}
        disableColumnMenu
        disableColumnResize
        showToolbar
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        initialState={{
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
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
