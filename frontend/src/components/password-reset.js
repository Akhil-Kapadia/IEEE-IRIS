import * as React from "react";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Avatar } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from "@mui/material/Typography";

import { api } from "../config";
import { Container } from "@mui/material";

function ResetEmail() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rnum: ""
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [msg, setMsg] = React.useState("");

  const onSubmit = async(data) => {
    try {
      let res = await api.post("password-reset", qs.stringify(data));
    } catch (err) {

    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockResetIcon/>
        </Avatar>
        <Typography component="h2" variant="h6">
          Forgot Password?
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            margin: 2,
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Controller
                name="rnum"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="R-Number"
                    error={Boolean(errors.rnum)}
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" fullWidth>
                Send Reset Email
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

function ResetPassword({ match }) {}

export { ResetEmail, ResetPassword };
