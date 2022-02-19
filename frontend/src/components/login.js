import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">TTU ECE IEEE Student Branch</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [msg, setMsg] = React.useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rNum: "", password: "" } });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login",
        qs.stringify({
          id: data.rNum,
          password: data.password,
        }));
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      reset({ rNum: "", password: "" });
      navigate(-1);
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="rNum"
            control={control}
            rules={{
              required: true,
              maxLength: 8,
              message: "Please enter the R-Number correctly!",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="R-Number"
                error={Boolean(msg) || errors.rNum}
                required
                fullWidth
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Password"
                type="password"
                error={Boolean(msg)}
                autoComplete="current-password"
                fullWidth
                required
              />
            )}
          />
          <Typography
            variant="body1"
            gutterBottom
            component="h5"
            sx={{ textAlign: "center", color: "error.main" }}
          >
            {msg}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
