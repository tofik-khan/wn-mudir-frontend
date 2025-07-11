import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import { AdminBar } from "../Nav/AdminBar";
import { AdminSideBar } from "../Nav/AdminSideBar";
import { Box } from "@mui/material";
import { Loading } from "../Loading";
import { useEffect } from "react";
import {
  useAdminImageMutation,
  useAdminLastLoginMutation,
  useAdminsQuery,
} from "@/queries/mudir/admins";
import { useAppDispatch } from "@/hooks";
import { setCurrentUser } from "@/reducers/admin";

export const ProtectedLayout = withAuthenticationRequired(
  () => {
    const { isLoading: isLoadingAuth, logout, user } = useAuth0();
    const { isLoading: isLoadingAdmins, data: adminData } = useAdminsQuery();

    const adminImageMutation = useAdminImageMutation();
    const adminLastLoginMutation = useAdminLastLoginMutation();

    const dispatch = useAppDispatch();

    const updateAdminImage = async ({ _id, image }) => {
      await adminImageMutation.mutateAsync({
        _id,
        image,
      });
    };

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

        adminLastLoginMutation.mutate({ _id: currentUser!._id });
        if (currentUser!.image !== user!.picture)
          updateAdminImage({ _id: currentUser!._id, image: user!.picture });
      }
    }, [isLoadingAdmins, isLoadingAuth]);

    if (isLoadingAuth || isLoadingAdmins) return <Loading />;

    const currentUser =
      adminData &&
      user &&
      adminData.find((admin) => admin.email === user.email);
    if (!currentUser) {
      handleLogout();
      return <></>;
    }

    dispatch(setCurrentUser(currentUser));

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
  },
  {
    onRedirecting: () => <Loading />,
    returnTo: window.location.pathname,
  }
);
