import { Loading } from "@/components/Loading";
import { useFaqQuery } from "@/queries/expo/faqs";
import parseHTML from "@/utils/parseHTML";
import { Add } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router";

export const PageExpoFAQs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isRefetching } = useFaqQuery();

  const columns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ row }) => row.title,
      width: 200,
    },
    {
      field: "content",
      headerName: "Content",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
            <Box
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {parseHTML({ html: row.content })}
            </Box>
          </Box>
        );
      },
      flex: 1,
    },
    {
      field: "isPublished",
      headerName: "Published",
      renderCell: ({ row }) => (row.isPublished ? "Published" : "UnPublished"),
    },
  ];

  if (isLoading || isRefetching) return <Loading />;

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 3, my: 1 }}
      >
        <Typography variant="h2">EXPO FAQs</Typography>
        <Button
          variant={"contained"}
          onClick={() => navigate("/protected/expo/faqs/new")}
        >
          <Add />
          Create FAQ
        </Button>
      </Box>
      <DataGridPro
        loading={isLoading || isRefetching}
        rows={data ?? []}
        columns={columns}
        getRowId={(row) => row._id ?? row.title}
        rowHeight={120}
        onRowClick={({ row }) => {
          navigate(`/protected/expo/faqs/${row._id}`);
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
