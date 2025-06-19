import { LazyImage } from "@/components/LazyImage";
import { Loading } from "@/components/Loading";
import { useOneApplicantQuery } from "@/queries/waqfeardhi/applicants";
import { useProjectsQuery } from "@/queries/waqfeardhi/projects";
import {
  EmailOutlined,
  GroupOutlined,
  PhoneOutlined,
  PlaceOutlined,
  TagOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { applicationStatusOptions } from "@/constants/waqfeardhi";

const PendingActions = () => {
  return (
    <>
      <Button>Pending Actions</Button>
    </>
  );
};

const IntroductionActions = () => {
  return (
    <>
      <Button>Introduction Actions</Button>
    </>
  );
};

const InProgressActions = () => {
  return (
    <>
      <Button>In Progress Actions</Button>
    </>
  );
};

const CompletedActions = () => {
  return (
    <>
      <Button>Completed Actions</Button>
    </>
  );
};

const NeverStartedActions = () => {
  return (
    <>
      <Button>Never Started Actions</Button>
    </>
  );
};

export const PageApplicant = () => {
  const { id } = useParams();
  const { data, isLoading } = useOneApplicantQuery({ _id: id });
  const { data: projects, isLoading: isLoadingProjects } = useProjectsQuery();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    if (isLoading === false) {
      const applicant = data && data[0];
      setStatus(applicant?.status);
    }
  }, [isLoading]);

  if (isLoading || isLoadingProjects) return <Loading />;

  const applicant = data && data[0];

  if (!applicant)
    return (
      <Typography variant="h1" color="error">
        No applicant found
      </Typography>
    );

  const project =
    applicant &&
    projects &&
    projects.find((project) => project.slug === applicant.slug);

  return (
    <>
      <Typography variant="h2">
        Applicant: {applicant?.firstname} {applicant?.lastname}
      </Typography>

      <Card variant="outlined" sx={{ p: 2, my: 3 }}>
        <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
          Project Info
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <LazyImage
            src={project?.thumbnail}
            defaultImage={""}
            style={{ width: "300px", height: "200px", objectFit: "cover" }}
          />
          <Box>
            <Typography variant="h6">{project?.title}</Typography>
            <Typography variant="subtitle1">{project?.subtitle}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body1">{project?.duration}</Typography>
              <Typography variant="body1">{project?.audience}</Typography>
            </Box>
            <Typography variant="body1">
              <Typography component={"span"} color="text.secondary">
                Sponsor:
              </Typography>{" "}
              {project?.sponsor.name} ({project?.sponsor.email})
            </Typography>
            <Typography variant="body1">
              <Typography component={"span"} color="text.secondary">
                Department:
              </Typography>{" "}
              {project?.sponsor.department}
            </Typography>
          </Box>
        </Box>
      </Card>

      <Card variant="outlined" sx={{ p: 2, my: 3 }}>
        <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
          Applicant Info
        </Typography>
        <Typography variant="h6">{`${applicant.firstname} ${applicant.lastname}`}</Typography>
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <Chip
            variant="outlined"
            icon={<PlaceOutlined />}
            label={applicant.jammat}
          />
          <Chip
            variant="outlined"
            icon={<EmailOutlined />}
            label={applicant.email}
          />
          <Chip
            variant="outlined"
            icon={<PhoneOutlined />}
            label={applicant.phone}
          />
          <Chip
            variant="outlined"
            icon={<GroupOutlined />}
            label={applicant.auxiliary}
          />
          <Chip
            variant="outlined"
            icon={<TagOutlined />}
            label={applicant.membercode}
          />
        </Box>
        <Typography>{applicant.comments}</Typography>
      </Card>

      <Card variant="outlined" sx={{ p: 2, my: 3 }}>
        <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
          Actions (Work in Progress)
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="application-status">Application Status</InputLabel>
          <Select
            labelId="application-status"
            id="application-status"
            value={status}
            label="Application Status"
            onChange={(event) => setStatus(event.target.value)}
          >
            {applicationStatusOptions.map((status, index) => (
              <MenuItem value={status.value} key={index}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box my={2}>
          {status === "pending" ? (
            <PendingActions />
          ) : status === "intro-made" ? (
            <IntroductionActions />
          ) : status === "in-progress" ? (
            <InProgressActions />
          ) : status === "completed" ? (
            <CompletedActions />
          ) : status === "never-started" ? (
            <NeverStartedActions />
          ) : (
            "No Actions"
          )}
        </Box>
      </Card>
    </>
  );
};
