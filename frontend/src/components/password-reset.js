import * as React from "react";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Avatar } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
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
      rnum: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [msg, setMsg] = React.useState("");

  const onSubmit = async (data) => {
    try {
      let res = await api.post("password-reset", qs.stringify(data));
      enqueueSnackbar(`Sent!`, { variant: "success" });
      setMsg(`Please check ${res.data.email} for a reset link.`);
    } catch (err) {
      if (err.response.status === 404) {
        enqueueSnackbar("User not found");
      } else {
        setMsg(
          "Failed to send email. Please contact an IEEE officer to reset your email."
        );
      }
    }
    reset({ rnum: "" });
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
          <LockResetIcon />
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
              <Typography variant="body2">{msg}</Typography>
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

function ResetPassword() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      passwordconfirm: "",
    },
  });
  const token = useParams().token;
  const { enqueueSnackbar } = useSnackbar();
  const [msg, setMsg] = React.useState("");
  const password = useRef({});
  password.current = watch("password", "");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let res = await api.put(
        "password-reset",
        qs.stringify({
          password: data.password,
          token: token,
        })
      );
      navigate("/login", {replace: true});
      setMsg("Sucessfully reset password!");
    } catch (err) {
      setMsg("Failed to reset. Try resending the reset email!");
    }
    reset({password: '', passwordconfirm: ''});
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
          <LockResetIcon />
        </Avatar>
        <Typography component="h2" variant="h6">
          Change Password
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
            <Grid item xs={12} md={12}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="New Password"
                    error={errors.password}
                    fullWidth
                    required
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.password && <p>{errors.password.message}</p>}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                name="passwordconfirm"
                control={control}
                rules={{
                  validate: (value) =>
                    value === password.current || "Passwords do not match!",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    error={errors.passwordconfi}
                    label="Confirm New Password"
                    fullWidth
                    required
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.passwordconfirm && (
                  <p>{errors.passwordconfirm.message}</p>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{msg}</Typography>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" fullWidth>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export { ResetEmail, ResetPassword };
