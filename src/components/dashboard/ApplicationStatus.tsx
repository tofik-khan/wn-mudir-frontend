import {
  useDigitalOceanQuery,
  useImageKitUsageQuery,
  useMongoDbQuery,
} from "@/queries/mudir/dashboard";
import {
  Paper,
  CircularProgress,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

export const ApplicationStatus = () => {
  const { data: digitalOceanStatus, isLoading: isLoadingDigitalOceanStatus } =
    useDigitalOceanQuery();
  const { data: mongodbStatus, isLoading: isLoadingMongodbStatus } =
    useMongoDbQuery();
  const { status: imageKitStatus, isLoading: isLoadingImageKitStatus } =
    useImageKitUsageQuery();
  return (
    <Paper sx={{ padding: 2 }} variant="outlined">
      <>
        <Typography variant="overline">Application Status</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}>Service</Typography>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>DigitalOcean</TableCell>
                <TableCell>
                  {isLoadingDigitalOceanStatus ? (
                    <CircularProgress />
                  ) : (
                    <Chip
                      variant="outlined"
                      label={
                        digitalOceanStatus!.isOnline
                          ? "◉ Online"
                          : `◉ ${digitalOceanStatus!.message}`
                      }
                      color={digitalOceanStatus!.isOnline ? "success" : "error"}
                    />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Database</TableCell>
                <TableCell>
                  {isLoadingMongodbStatus ? (
                    <CircularProgress />
                  ) : (
                    <Chip
                      variant="outlined"
                      label={
                        mongodbStatus!.isOnline
                          ? "◉ Online"
                          : `◉ ${mongodbStatus!.message}`
                      }
                      color={mongodbStatus!.isOnline ? "success" : "error"}
                    />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ImageKit</TableCell>
                <TableCell>
                  {isLoadingImageKitStatus ? (
                    <CircularProgress />
                  ) : (
                    <Chip
                      variant="outlined"
                      label={
                        imageKitStatus === "success"! ? "◉ Online" : `◉ Error`
                      }
                      color={imageKitStatus === "success" ? "success" : "error"}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Paper>
  );
};
