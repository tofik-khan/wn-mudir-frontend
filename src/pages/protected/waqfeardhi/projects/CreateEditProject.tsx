import { LazyImage } from "@/components/LazyImage";
import { Editor } from "@/components/wysiwyg/editor";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  FormControlLabel,
  LinearProgress,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { ThumbnailModals } from "./modals/ThumbnailModal";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";
import {
  useCreateProjectMutation,
  useProjectsQuery,
  useUpdateProjectMutation,
} from "@/queries/waqfeardhi/projects";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";

export const PageCreateEditProject = () => {
  const { control, handleSubmit, reset } = useForm();
  const { data: projects, isLoading: isLoadingProjects } = useProjectsQuery();
  const createProject = useCreateProjectMutation();
  const updateProject = useUpdateProjectMutation();
  const [editorContent, updateEditorContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ open: false, message: "" });
  const [openThumbnailModal, setOpenThumbnailModal] = useState(false);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.admin);
  const { id } = useParams();
  const editMode = id !== "new";
  const navigate = useNavigate();

  /** Setting state value if edit mode is set */
  useEffect(() => {
    if (editMode && projects && projects.length > 0) {
      const currentProject = projects.find((project) => project._id === id);
      setThumbnail(currentProject!.thumbnail);
      updateEditorContent(currentProject!.description);
    }
  }, [projects, isLoadingProjects]);

  const onSubmit = async (data) => {
    if (editorContent === "") {
      /** Description Required */
      setError({ open: true, message: "Description is required!" });
      return;
    }
    if (thumbnail === "") {
      /** Thumbnail required */
      setError({ open: true, message: "Project Thumbnail is required!" });
      return;
    }
    const projectSlugs = projects!.map((project) => project.slug);
    if (projectSlugs.includes(data.slug)) {
      /** Project Slug should be unique */
      const currentProject =
        projects && projects.find((project) => project._id === id);
      if (!editMode || currentProject!.slug !== data.slug) {
        setError({ open: true, message: "Project Slug Must be unique!" });
        return;
      }
    }
    if (isAuthenticated) {
      const authToken = await getAccessTokenSilently();
      if (editMode) {
        updateProject.mutate({
          authToken,
          data: {
            ...data,
            _id: id,
            description: editorContent,
            thumbnail,
            editedBy: currentUser?._id,
            published: !!data.published,
          },
        });
      } else {
        createProject.mutate({
          authToken,
          data: {
            ...data,
            description: editorContent,
            thumbnail,
            createdBy: currentUser?._id,
            published: !!data.published,
          },
        });
      }
      setSuccess(true);
    }
  };

  if (isLoadingProjects) return <Loading />;

  const currentProject =
    projects && projects.find((project) => project._id === id);

  if (editMode && !currentProject) {
    return (
      <Typography variant="h2" color="error">
        Could not fetch project
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h2" textAlign={"center"}>
        {editMode ? "Edit Project" : "Create New Project"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={1000} m="auto">
          <Card variant="outlined" sx={{ p: 2, my: 3 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
              Project Info
            </Typography>
            <Box
              sx={{
                mx: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editMode ? (
                <img src={thumbnail} width={600} height={400} />
              ) : (
                <LazyImage
                  src={thumbnail}
                  defaultImage={""}
                  style={{
                    width: "600px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              )}
              <Button
                sx={{ my: 1 }}
                onClick={() => setOpenThumbnailModal(true)}
              >
                Select Thumbnail
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 1,
                my: 2,
                gap: 2,
              }}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Title"
                    sx={{ width: "80%" }}
                  />
                )}
                name="title"
                control={control}
                key={"title-input"}
                defaultValue={editMode ? currentProject!.title : ""}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="SubTitle"
                    sx={{ width: "80%" }}
                  />
                )}
                name="subtitle"
                control={control}
                key={"subtitle-input"}
                defaultValue={editMode ? currentProject!.subtitle : ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 1,
                my: 2,
                gap: 2,
              }}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Duration"
                    sx={{ width: "80%" }}
                  />
                )}
                name="duration"
                control={control}
                key={"duration-input"}
                defaultValue={editMode ? currentProject!.duration : ""}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Audience"
                    sx={{ width: "80%" }}
                  />
                )}
                name="audience"
                control={control}
                key={"audience-input"}
                defaultValue={editMode ? currentProject!.audience : ""}
              />
            </Box>
            <Box mx={1} my={3}>
              <Typography
                sx={(theme) => ({ color: theme.palette.text.secondary })}
              >
                Description
              </Typography>
              <Editor
                content={editorContent}
                setContent={(content) => updateEditorContent(content)}
              />
            </Box>
          </Card>
          <Card variant="outlined" sx={{ p: 2, my: 3 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
              Sponsor Info
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mx: 1,
                my: 2,
                gap: 2,
              }}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Sponsor Name"
                    sx={{ width: "80%" }}
                  />
                )}
                name="sponsor.name"
                control={control}
                key={"sponsor.name-input"}
                defaultValue={editMode ? currentProject!.sponsor.name : ""}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Sponsor Email"
                    sx={{ width: "80%" }}
                  />
                )}
                name="sponsor.email"
                control={control}
                key={"sponsor.email-input"}
                defaultValue={editMode ? currentProject!.sponsor.email : ""}
              />
            </Box>
            <Box mx={1}>
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Sponsor Department"
                    sx={{ width: "100%" }}
                  />
                )}
                name="sponsor.department"
                control={control}
                key={"sponsor.department-input"}
                defaultValue={
                  editMode ? currentProject!.sponsor.department : ""
                }
              />
            </Box>
          </Card>
          <Card variant="outlined" sx={{ p: 2, my: 3 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 1 }}>
              Metadata
            </Typography>
            <Box
              sx={{ mx: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Slug"
                    sx={{ width: "50%" }}
                  />
                )}
                name="slug"
                control={control}
                key={"slug-input"}
                defaultValue={editMode ? currentProject!.slug : ""}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="materialUIInput"
                    label="Badge"
                    sx={{ width: "50%" }}
                  />
                )}
                name="badge"
                control={control}
                key={"badge-input"}
                defaultValue={editMode ? currentProject!.badge : ""}
              />
              <Controller
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch checked={field.value === true} />}
                    label="Published"
                  />
                )}
                name="published"
                control={control}
                key={"published-input"}
                defaultValue={editMode ? currentProject!.published : ""}
              />
            </Box>
          </Card>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => {
                reset();
                navigate("/protected/waqfeardhi/projects");
              }}
            >
              Cancel
            </Button>
            <Button sx={{ mb: 3 }} variant="contained" type="submit">
              Save changes
            </Button>
          </Box>
        </Box>
      </form>
      <ThumbnailModals
        open={openThumbnailModal}
        onClose={() => setOpenThumbnailModal(false)}
        onClick={setThumbnail}
      />
      <Snackbar
        open={success}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSuccess(false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            variant="filled"
          >
            <AlertTitle>Project {editMode ? "Edited" : "Created"}!</AlertTitle>
          </Alert>
          <LinearProgress sx={{ mx: 1 }} color="success" />
        </Box>
      </Snackbar>
      <Snackbar
        open={error.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setError({ open: false, message: "" })}
      >
        <Alert
          onClose={() => setError({ open: false, message: "" })}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </>
  );
};
