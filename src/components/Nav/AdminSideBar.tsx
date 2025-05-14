import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import AppLogo from "@/assets/mudir-logo.png";
import { Logout } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminSideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "fixed",
          top: 0,
          left: 0,
          width: "200px",
          height: "100vh",
          border: `1px solid ${theme.palette.grey[300]}`,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        })}
      >
        <Box
          sx={{ "&:hover": { cursor: "pointer" }, mt: 3, mb: 5 }}
          onClick={() => navigate("/protected/dashboard")}
        >
          <img src={AppLogo} width={150} height={70} />
        </Box>
        {/* WN Expo Links */}
        <Box>
          <Typography
            sx={(theme) => ({ color: theme.palette.grey[600], ml: 4 })}
          >
            Expo
          </Typography>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Sessions
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Presenters
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            FAQs
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Image Library
          </Button>
        </Box>
        <Divider
          sx={{ my: 3 }}
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        {/* WN Waqf-e-Ardhi Links */}
        <Box>
          <Typography
            sx={(theme) => ({ color: theme.palette.grey[600], ml: 4 })}
          >
            Waqf-e-Ardhi
          </Typography>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Projects
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Applicants
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Image Library
          </Button>
        </Box>
        <Divider
          sx={{ my: 3 }}
          orientation="horizontal"
          variant="middle"
          flexItem
        />
        <Button fullWidth onClick={() => navigate("/protected/admins")}>
          Admins
        </Button>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "30px",
          display: "flex",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <Button variant="contained" color="error" onClick={handleLogout}>
          <Logout /> Logout
        </Button>
      </Box>
    </>
  );
};
