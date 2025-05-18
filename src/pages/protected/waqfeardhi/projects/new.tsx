import { LazyImage } from "@/components/LazyImage";
import { Editor } from "@/components/wysiwyg/editor";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { ThumbnailModals } from "./modals/ThumbnailModal";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "@/hooks";

export const PageNewProject = () => {
  const { control, handleSubmit, reset } = useForm();
  const [editorContent, updateEditorContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({ open: false, message: "" });
  const [openThumbnailModal, setOpenThumbnailModal] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (editorContent === "") {
      setError({ open: true, message: "Description is required!" });
      return;
    }
    if (thumbnail === "") {
      setError({ open: true, message: "Project Thumbnail is required!" });
      return;
    }
    if (isAuthenticated) {
      console.log({
        ...data,
        description: editorContent,
        thumbnail,
        createdBy: currentUser?._id,
        published: !!data.published,
      });
    }
  };

  return (
    <>
      <Typography variant="h2" textAlign={"center"}>
        Create New Project
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
              <LazyImage
                src={thumbnail}
                defaultImage={""}
                style={{
                  width: "600px",
                  height: "400px",
                  objectFit: "contain",
                }}
              />
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
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    required
                    {...field}
                    className="materialUIInput"
                    label="Badge"
                    sx={{ width: "50%" }}
                  />
                )}
                name="badge"
                control={control}
                key={"badge-input"}
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
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Project Created!
        </Alert>
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
