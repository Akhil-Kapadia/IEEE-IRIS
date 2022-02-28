import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { api } from "../../App";

export default function OfficerForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rNum: "",
      memberId: '',
      ferpa: ''
    },
  });

  const onSubmit = (data) => {
    try {
      let res = api.put("/ieee/admin", qs.stringify(data));

    } catch (err) {
      
    }
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
            name="ferpa"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Ferpa"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Add Officer
          </Button>
        </Grid>
      </Grid>]
    </Box>

  );
}