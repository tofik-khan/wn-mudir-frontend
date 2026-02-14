import { FAQ } from "@/types/expo";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Editor } from "@/components/wysiwyg/editor";
import {
  useFaqMutation,
  useOneFaqQuery,
  useUpdateFaqMutation,
} from "@/queries/expo/faqs";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";

export const PageExpoEditFAQ = () => {
  const { id } = useParams();
  const editMode = id !== "new";
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FAQ>({
    defaultValues: {
      title: "",
      content: "",
      isPublished: true,
    },
  });

  const { data, isLoading, isRefetching } = useOneFaqQuery(id);
  const createFAQ = useFaqMutation({
    onSuccess: () => {
      navigate("/protected/expo/faqs");
    },
    onError: (error) => console.error(error),
  });
  const updateFAQ = useUpdateFaqMutation({
    onSuccess: () => {
      navigate("/protected/expo/faqs");
    },
    onError: (error) => console.error(error),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      isPublished:
        typeof data.isPublished === "boolean"
          ? data.isPublished
          : Boolean(data.isPublished === "true"),
    };
    if (editMode) {
      updateFAQ.mutate({ data: payload, id: id ?? "" });
    } else {
      createFAQ.mutate({ data: payload });
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  if (isLoading || isRefetching) return <Loading />;

  return (
    <>
      <Typography variant="h2">{`${editMode ? "Edit" : "Add"} FAQ`}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 5,
          }}
        >
          <Box display={"flex"} gap={2}>
            <Controller
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  required
                  {...field}
                  className="materialUIInput"
                  label="Title"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              name="title"
              control={control}
              key="title-input"
              // defaultValue={data?.title}
              rules={{ required: "This is a required field" }}
            />
          </Box>
          <Box my={1}>
            <Typography
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              Description
            </Typography>
            <Controller
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Editor
                    content={value}
                    setContent={(content) => onChange(content)}
                  />
                  {error && (
                    <Typography color="error">{error.message}</Typography>
                  )}
                </>
              )}
              name="content"
              control={control}
              key="content-input"
              // defaultValue={data?.title}
              rules={{ required: "This is a required field" }}
            />
          </Box>
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl>
                    <FormLabel>Published?</FormLabel>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      row
                    >
                      <FormControlLabel
                        value={true}
                        label="Yes"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value={false}
                        label="No"
                        control={<Radio />}
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              );
            }}
            name="isPublished"
            control={control}
            key={"isFeatured-input"}
            // defaultValue={Boolean(data?.isFeatured)}
          />
        </Box>
        <Button
          loading={createFAQ.isPending || updateFAQ.isPending}
          disabled={createFAQ.isPending || updateFAQ.isPending}
          variant="contained"
          type="submit"
        >
          {editMode ? "Update" : "Submit"}
        </Button>
      </form>
    </>
  );
};
