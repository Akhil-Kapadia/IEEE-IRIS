import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from '@mui/material/Backdrop';
import axios from "axios";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login(props) {
  const [open, setOpen] = React.useState(props.open);
  const [msg, setMsg] = React.useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rNum: "", password: "" } });

  React.useEffect( () => {
    setOpen(props.open);
  }, [props.open]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "/api/login",
        qs.stringify({
          id: data.rNum,
          password: data.password,
        }),
        { timeout: 2000 }
      );
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      reset({ rNum: "", password: "" });
      setOpen(false);
    } catch (err) {
      setMsg(err.response.data.msg);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Container maxWidth="xs" sx={style}>
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
                    error={Boolean(msg)}
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
                  <Link to="/register">"Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Fade>
    </Modal>
  );
}
