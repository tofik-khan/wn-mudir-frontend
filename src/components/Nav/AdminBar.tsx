import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Typography } from "@mui/material";

export const AdminBar = () => {
  const { user } = useAuth0();
  return (
    <>
      <Box
        sx={(theme) => ({
          position: "fixed",
          top: "0px",
          left: "202px",
          backgroundColor: "white",
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: "4px",
          borderLeft: 0,
          borderTop: 0,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: `calc(100% - 210px)`,
          p: 1,
          zIndex: 1000,
        })}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            gap: 2,
            color: "black",
            mx: 3,
            py: 1,
          }}
        >
          <Avatar src={user?.picture} />
          <Typography>{`${user?.given_name} ${user?.family_name}`}</Typography>
        </Box>
      </Box>
      <Box sx={{ height: 70 }}></Box>
    </>
  );
};
