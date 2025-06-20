import { Box, Button, Chip, Divider, Typography } from "@mui/material";
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
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography
              sx={(theme) => ({ color: theme.palette.grey[600], ml: 4 })}
            >
              Expo
            </Typography>
            <Chip
              label="Coming Soon"
              variant="outlined"
              color="primary"
              size="small"
            />
          </Box>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Dashboard
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Sessions
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            Presenters
          </Button>
          <Button disabled fullWidth sx={{ mt: 1 }}>
            FAQs
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
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/protected/waqfeardhi")}
          >
            Dashboard
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/protected/waqfeardhi/projects")}
          >
            Projects
          </Button>
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/protected/waqfeardhi/applicants")}
          >
            Applicants
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
        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate("/protected/images")}
        >
          Image Library
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
