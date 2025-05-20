import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const PageDashboard = () => {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return (
    <>
      <p>Authenticated</p>
      <p>User: {user?.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};
