import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { AdminBar } from "../Nav/AdminBar";
import { AdminSideBar } from "../Nav/AdminSideBar";
import { Box } from "@mui/material";
import { Loading } from "../Loading";

export const ProtectedLayout = () => {
  const {
    isLoading: isLoadingAuth,
  } = useAuth0();

  if (isLoadingAuth)
    return (<Loading />);

  return (
    <>
      <AdminSideBar />
      <AdminBar />
      <Box
        component={"main"}
        sx={{
          ml: "200px",
          px: "20px",
          pt: "40px",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};