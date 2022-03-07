import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import { api } from "../../config";
import { useSnackbar } from "notistack";

export default function ResetPassword() {
  const[loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rNum: "",
      password: ''
    },
  });

  const onSubmit = async(data) => {
    setLoading(true)
    try {
      let res = await api.put("/user/", data);
      reset({rNum:'', password:''})
      enqueueSnackbar("Successfully Changed Password", {variant: 'success'});
    } catch (err) {
      enqueueSnackbar("Failed to update!", {variant: "error"});
    }
    setLoading(false)
  }

  const checkUser = async(value) => {
    try {
      let res = await api.get(`/user/${value}`);
      if(res){
        return true;
      }
      return false
    } catch (err) {
      return false
    }
  }

  return (
    <Box>
      <Grid 
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      flexGrow
      spacing={2}>
        <Grid item>
          <Controller
            name="rNum"
            control={control}
            rules={{
              required: true
            }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="R-Number" fullWidth type="number" />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="password"
            control={control}
            rules={{required:true}}
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
            Reset Password
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
