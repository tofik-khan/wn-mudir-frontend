import { LazyImage } from "@/components/LazyImage";
import { Editor } from "@/components/wysiwyg/editor";
import { Session } from "@/types/expo";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { SessionImageModal } from "./modals/SessionImageModal";
import { usePresentersQuery } from "@/queries/expo/presenters";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useOneSessionQuery,
  useSessionMutation,
  useUpdateSessionMutation,
} from "@/queries/expo/sessions";
import { Loading } from "@/components/Loading";
dayjs.extend(utc);
dayjs.extend(timezone);

export const PageCreateEditSession = () => {
  const { id } = useParams();
  const editMode = id !== "new";
  const navigate = useNavigate();
  const createSession = useSessionMutation({
    onSuccess: () => {
      navigate("/protected/expo/sessions");
    },
    onError: () => {
      console.error("OOPS");
    },
  });
  const updateSession = useUpdateSessionMutation({
    onSuccess: () => {
      navigate("/protected/expo/sessions");
    },
    onError: () => {
      console.error("OOPS");
    },
  });

  const [description, setDescription] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);

  const { isLoading: isLoadingPresenters, data: presenters } =
    usePresentersQuery();

  const { data, isLoading } = useOneSessionQuery(id);

  const { control, handleSubmit, setValue, reset } = useForm<Session>({
    defaultValues: {
      thumbnail: "",
      isPublished: false,
    },
    values: data,
  });

  const presenterOptions =
    presenters?.map((presenter) => ({
      label: `${presenter.name} - ${presenter.department}`,
      value: presenter._id,
    })) ?? [];

  useEffect(() => {
    if (data) {
      reset(data);
      setDescription(data.description);
    }
  }, [data]);

  if (isLoading || isLoadingPresenters) return <Loading />;

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      ...data,
      startTime:
        typeof data.startTime === "string"
          ? data.startTime
          : data.startTime.format("hh:mm a"),
      endTime:
        typeof data.endTime === "string"
          ? data.endTime
          : data.endTime.format("hh:mm a"),
      date: typeof data.date === "string" ? data.date : data.date.value,
      description,
    };
    if (editMode) {
      updateSession.mutate({ data: payload, id: id ?? "" });
    } else {
      createSession.mutate({ data: payload });
    }
  };

  const dates = [
    { label: "Day 1", value: "2026-05-10" },
    { label: "Day 2", value: "2026-05-11" },
  ];

  return (
    <>
      <Typography variant="h2">{`${editMode ? "Edit" : "Add"} Session`}</Typography>
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
            name="thumbnail"
            control={control}
            key={"thumbnail-input"}
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
                label="Title"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            name="title"
            control={control}
            key="title-input"
            defaultValue={data?.title}
            rules={{ required: "This is a required field" }}
          />
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Location"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            name="location"
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
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Controller
              render={({ field }) => (
                <Autocomplete
                  className="materialUIInput"
                  multiple
                  options={presenterOptions}
                  loading={isLoadingPresenters}
                  value={field.value || []}
                  disableCloseOnSelect
                  isOptionEqualToValue={(opt, val) => opt.value === val.value}
                  onChange={(_, option) => {
                    field.onChange(option);
                  }}
                  limitTags={4}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "500px" }}
                      {...params}
                      label="Presenters"
                    />
                  )}
                />
              )}
              name="presenters"
              control={control}
              key="presenters-input"
            />
          </Box>
          <Controller
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <TimePicker
                    label="Start Time"
                    value={value ? dayjs(value, "hh:mm a") : null}
                    onChange={(newValue) => {
                      return onChange(newValue);
                    }}
                    sx={{ width: "200px" }}
                    timezone="America/New_York"
                  />
                </>
              );
            }}
            name="startTime"
            control={control}
            key={"startTime-input"}
          />
          <Controller
            render={({ field: { value, onChange } }) => {
              return (
                <>
                  <TimePicker
                    label="End Time"
                    value={value ? dayjs(value, "hh:mm a") : null}
                    onChange={(newValue) => {
                      return onChange(newValue);
                    }}
                    sx={{ width: "200px" }}
                    timezone="America/New_York"
                  />
                </>
              );
            }}
            name="endTime"
            control={control}
            key={"endTime-input"}
          />

          <Controller
            render={({ field }) => (
              <Autocomplete
                className="materialUIInput"
                options={dates}
                defaultValue={
                  dates.find((date) => date.value === field.value) ?? dates[0]
                }
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                onChange={(_, option) => {
                  field.onChange(option);
                }}
                limitTags={4}
                renderInput={(params) => (
                  <TextField sx={{ width: "500px" }} {...params} label="Date" />
                )}
              />
            )}
            name="date"
            control={control}
            key="date-input"
          />
          <Controller
            render={({ field, fieldState }) => (
              <TextField
                required
                {...field}
                className="materialUIInput"
                label="Link"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            name="link"
            control={control}
            key="link-input"
            // defaultValue={data?.department}
            rules={{ required: "This is a required field" }}
          />
          <Box mx={1} my={1}>
            <Typography
              sx={(theme) => ({ color: theme.palette.text.secondary })}
            >
              Description
            </Typography>
            <Editor
              content={description}
              setContent={(content) => setDescription(content)}
            />
          </Box>
          <Button
            loading={createSession.isPending || updateSession.isPending}
            disabled={createSession.isPending || updateSession.isPending}
            variant="contained"
            type="submit"
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </form>
      <SessionImageModal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        onClick={(image) => setValue("thumbnail", image)}
      />
    </>
  );
};
