import {
  Box
} from "@mui/material";

export const AdminBar = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
          position: "fixed",
          top: "20px",
          left: "202px",
          backgroundColor: "white",
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: "4px",
          borderLeft: 0,
          borderTop: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: `calc(100% - 210px)`,
          p: 1,
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
          }}
        >
          Logged In
        </Box>
      </Box>
      <Box sx={{ height: 70 }}></Box>
    </>
  );
};
