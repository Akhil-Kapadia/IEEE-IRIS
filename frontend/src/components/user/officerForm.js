import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import qs from "qs";

import { api } from "../../config";

export default function OfficerForm() {
  const[loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rNum: "",
      memberId: '',
      ferpa: '',
      officer: ''
    },
  });

  const onSubmit = async(data) => {
    setLoading(true);
    try {
      let res = await api.put("/ieee/admin", qs.stringify(data));
      enqueueSnackbar(`IEEE member updated!`, {variant:"info"});
      reset({
        rNum: "",
        memberId: '',
        ferpa: '',
        officer: ''
      })
    } catch (err) {
      if(err.response.status === 404) {
        return enqueueSnackbar("User not found", {variant:'error'});
      }
      if(err.response) enqueueSnackbar("Failed to update member!")
    }
    setLoading(false);
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
        sx={{ p: 2 }}
      >
        <Grid item xs={12}>
          <Controller
            name="rNum"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="R-Number"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="memberId"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="IEEE Member ID"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="officer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Officer Position"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="ferpa"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Ferpa Certification"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            onClick={handleSubmit(onSubmit)}
            size="large"
            fullWidth
            loading={loading}
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Add Officer
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>

  );
}