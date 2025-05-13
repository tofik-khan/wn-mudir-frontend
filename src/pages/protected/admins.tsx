import { Loading } from "@/components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const PageAdmins = withAuthenticationRequired(
  () => {
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
        <p>Authenticated with Admins</p>
        <p>User: {user?.email}</p>
        <Button onClick={handleLogout}>Logout</Button>
      </>
    );
},
{
  onRedirecting: () => <Loading />,
  returnTo: window.location.pathname
}
)