import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { AdminBar } from "../Nav/AdminBar";
import { AdminSideBar } from "../Nav/AdminSideBar";
import { Box } from "@mui/material";
import { Loading } from "../Loading";
import { useEffect } from "react";
import { useAdminsQuery } from "@/queries/mudir/admins";

export const ProtectedLayout = () => {
  const {
    isAuthenticated,
    isLoading: isLoadingAuth,
    logout,
    user,
  } = useAuth0();
  const { isLoading: isLoadingAdmins, data: adminData } = useAdminsQuery();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${window.location.protocol}//${window.location.host}/403`,
      },
    });
  };

  useEffect(() => {
    if (!(isLoadingAuth || isLoadingAdmins)) {
      const currentUser = adminData?.find(
        (admin) => admin.email === user?.email
      );
      if (!currentUser || !currentUser.isAuthorized) {
        handleLogout();
      }
    }
  }, [isAuthenticated, isLoadingAdmins]);

  if (isLoadingAuth || isLoadingAdmins) return <Loading />;

  const currentUser =
    adminData && user && adminData.find((admin) => admin.email === user.email);
  if (!currentUser) {
    handleLogout();
    return <></>;
  }

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
