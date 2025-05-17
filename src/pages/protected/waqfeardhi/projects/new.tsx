import { Editor } from "@/components/wysiwyg/editor";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

export const PageNewProject = () => {
  const { control, handleSubmit, reset } = useForm();
  const [editorContent, updateEditorContent] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log({ ...data, description: editorContent });
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
    </>
  );
};
