import { LazyImage } from "@/components/LazyImage";
import { Editor } from "@/components/wysiwyg/editor";
import { Presenter } from "@/types/expo";
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { PresenterImageModal } from "./modals/selectImageModal";
import {
  useOnePresenterQuery,
  usePresenterMutation,
  useUpdatePresenterMutation,
} from "@/queries/expo/presenters";
import { Loading } from "@/components/Loading";

export const PageCreateEditPresenter = () => {
  const { id } = useParams();
  const editMode = id !== "new";
  const navigate = useNavigate();

  const { data, isLoading, isRefetching } = useOnePresenterQuery(id);
  const createPresenter = usePresenterMutation({
    onSuccess: () => {
      navigate("/protected/expo/presenters");
    },
    onError: (error) => console.error(error),
  });
  const updatePresenter = useUpdatePresenterMutation({
    onSuccess: () => {
      navigate("/protected/expo/presenters");
    },
    onError: (error) => console.error(error),
  });

  const { control, handleSubmit, setValue, reset } = useForm<Presenter>({
    defaultValues: {
      image: "",
      isFeatured: false,
      isPublished: false,
    },
  });
  const [bio, setBio] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);

  const onSubmit = (data) => {
    const payload = {
      bio,
      ...data,
      isFeatured: Boolean(data.isFeatured === "true"),
      isPublished: Boolean(data.published === "true"),
    };
    if (editMode) {
      updatePresenter.mutate({ data: payload, id: id ?? "" });
    } else {
      createPresenter.mutate({ data: payload });
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
      setBio(data.bio);
    }
  }, [data]);

  if (isLoading || isRefetching) return <Loading />;

  return (
    <>
      <Typography variant="h2">{`${editMode ? "Edit" : "Add"} Presenter`}</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            mx: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Controller
            render={({ field, fieldState }) => (
              <>
                {editMode ? (
                  <img src={field.value} width={400} height={400} />
                ) : (
                  <LazyImage
                    src={field.value}
                    defaultImage={""}
                    style={{
                      width: "400px",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                )}
                {fieldState.error && (
                  <Typography color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
            name="image"
            control={control}
            key={"image-input"}
            rules={{ required: "This is a required field" }}
          />

          <Button sx={{ my: 1 }} onClick={() => setOpenImageModal(true)}>
            Select Thumbnail
          </Button>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            name="name"
            control={control}
            key="name-input"
            defaultValue={data?.name}
            rules={{ required: "This is a required field" }}
          />
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Department"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            name="department"
            control={control}
            key="department-input"
            defaultValue={data?.department}
            rules={{ required: "This is a required field" }}
          />
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl>
                    <FormLabel>Featured?</FormLabel>
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
            name="isFeatured"
            control={control}
            key={"isFeatured-input"}
            defaultValue={Boolean(data?.isFeatured)}
          />
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
            key={"isPublished-input"}
          />
          <Box mx={1} my={1}>
            <Typography
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              Description
            </Typography>
            <Editor content={bio} setContent={(content) => setBio(content)} />
          </Box>
          <Button
            loading={createPresenter.isPending || updatePresenter.isPending}
            disabled={createPresenter.isPending || updatePresenter.isPending}
            variant="contained"
            type="submit"
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
      <PresenterImageModal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        onClick={(image) => setValue("image", image)}
      />
    </>
  );
};
