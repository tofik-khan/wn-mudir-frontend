import { Loading } from "@/components/Loading";
import { useAdminsQuery } from "@/queries/mudir/admins";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Add, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGridPro, gridClasses, GridColDef } from "@mui/x-data-grid-pro";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import { CreateEditAdminModal } from "./modals/CreateEditAdminModal";
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

export const PageAdmins = withAuthenticationRequired(
  () => {
    const {
      data: admins,
      isLoading: isLoadingAdmins,
      isRefetching: isRefetchingAdmins,
    } = useAdminsQuery();
    const theme = useTheme();
    const [openCreateAdminDialog, setOpenCreateAdminDialog] = useState(false);
    const [admin, setAdmin] = useState(null);

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
        headerName: "Name",
        renderCell: ({ row }) => (
          <Chip
            avatar={<Avatar alt={row.name} src={row.image} />}
            label={row.name}
            variant="outlined"
          />
        ),
        flex: 3,
      },
      {
        field: "email",
        headerName: "Email",
        renderCell: ({ row }) => row.email,
        flex: 4,
      },
      {
        field: "title",
        headerName: "Title",
        renderCell: ({ row }) => row.title,
        flex: 3,
      },
      {
        field: "isSuperuser",
        headerName: "Role",
        renderCell: ({ row }) =>
          row.isSuperuser ? (
            <Chip label={"Super User"} color="primary" />
          ) : (
            <Chip label={"Admin"} color="secondary" />
          ),
        flex: 2,
      },
      {
        field: "isAuthorized",
        headerName: "",
        renderCell: ({ row }) =>
          row.isAuthorized ? (
            <Chip label={"Authorized"} color="success" variant="outlined" />
          ) : (
            <Chip label={"Unauthorized"} color="error" variant="outlined" />
          ),
        flex: 2,
      },
      {
        field: "lastLogin",
        headerName: "Last Active",
        renderCell: ({ row }) =>
          row.lastLogin ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography color={theme.palette.grey[700]}>
                {dayjs(row.lastLogin).format("MM/DD/YYYY h:mma z")}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography color={theme.palette.grey[500]} fontStyle={"italic"}>
                never logged in
              </Typography>
            </Box>
          ),
        flex: 3,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }) => (
          <IconButton
            disabled={row.isSuperuser}
            color={"primary"}
            onClick={() => {
              setAdmin(row);
              setOpenCreateAdminDialog(true);
            }}
          >
            <Edit />
          </IconButton>
        ),
      },
    ];

    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: 3,
            my: 1,
          }}
        >
          <Typography variant="h2">Admins:</Typography>
          <Button
            variant="contained"
            onClick={() => setOpenCreateAdminDialog(true)}
            sx={{ display: "flex", gap: 1 }}
          >
            <Add />
            Create Admin
          </Button>
        </Box>
        <DataGridPro
          loading={isLoadingAdmins || isRefetchingAdmins}
          rows={admins && admins.map((admin, index) => ({ ...admin, index }))}
          columns={columns}
          getRowId={(row) => row._id}
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
        <CreateEditAdminModal
          open={openCreateAdminDialog}
          onClose={() => setOpenCreateAdminDialog(false)}
          admin={admin}
          setAdmin={setAdmin}
        />
      </>
    );
  },
  {
    onRedirecting: () => <Loading />,
    returnTo: window.location.pathname,
  }
);
