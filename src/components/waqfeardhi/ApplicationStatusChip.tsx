import { ApplicationStatus } from "@/types/waqfeardhi";
import { Chip } from "@mui/material";

export const ApplicationStatusChip = ({
  status,
}: {
  status: ApplicationStatus;
}) => {
  if (status === "in-progress") {
    return <Chip label="In Progress" variant="outlined" color="info" />;
  } else if (status === "intro-made") {
    return <Chip label="Introduced" variant="outlined" />;
  } else if (status === "completed") {
    return <Chip label="Completed" variant="filled" color="success" />;
  } else if (status === "never-started") {
    return <Chip label="Never Started" variant="outlined" color="error" />;
  } else {
    return <Chip label="Pending" variant="outlined" color="warning" />;
  }
};
