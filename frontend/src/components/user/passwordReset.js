import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { api } from "../../App";

export default function ResetPassword() {
  const [user, setUser] = React.useState({});
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rNum: ""
    },
  });

  const onSubmit = (data) => {
    try {
      let res = await api.get(`/user/${data.rNum}`);
      if(res.data === null) {
        reset({rNum:''});
        return;
      }
      setUser(res.data);


    } catch (err) {
      
    }
  }

  return (
    <Box
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="center"
      alignContent="center"
      flexGrow
    >
      <Grid spacing={2}>
        <Grid item>
          <Controller
            name="rNum"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="R-Number" fullWidth type="number" />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="rNum"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Password" fullWidth type="password" />
            )}
          />
        </Grid>
        <Grid item sm={6}>
          <LoadingButton
            type="submit"
            size="normal"
            fullWidth
            variant="contained"
            color="secondary"
            loading={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            Select User
          </LoadingButton>
        </Grid>
      </Grid>
      <Alert open={} onClose={() => setOpen(false)}>
        {`Are you sure you want to change ${user.fullname}'s password?`}
      </Alert>
    </Box>
  );
}
