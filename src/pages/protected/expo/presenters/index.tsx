import { LazyImage } from "@/components/LazyImage";
import { Loading } from "@/components/Loading";
import { usePresentersQuery } from "@/queries/expo/presenters";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";

export const PageExpoPresenters = () => {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = usePresentersQuery();

  if (isLoading || isRefetching) return <Loading />;

  const columns = [
    {
      field: "image",
      headerName: "Image",
      renderCell: ({ row }) => (
        <LazyImage
          src={row.image}
          defaultImage={""}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ row }) => row.name,
      flex: 3,
    },
    {
      field: "department",
      headerName: "Department",
      renderCell: ({ row }) => row.department,
      flex: 2,
    },
    {
      field: "isFeatured",
      headerName: "Featured",
      renderCell: ({ row }) => (row.isFeatured ? "Featured" : ""),
      flex: 2,
    },
  ];

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 3, my: 1 }}
      >
        <Typography variant="h2">EXPO Presenters</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/protected/expo/presenters/new")}
        >
          <Add />
          Add Presenter
        </Button>
      </Box>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id ?? row.name}
        rowHeight={120}
        onRowClick={({ row }) => {
          navigate(`/protected/expo/presenters/${row._id}`);
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
