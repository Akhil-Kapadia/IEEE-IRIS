import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, FormControlLabel, MenuItem } from "@mui/material";
import { useRef } from "react";
import qs from "qs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import {api} from "../config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/">TTU ECE IEEE student branch</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  // Select and box state
  const [classification, setClassification] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [isValid, setValid] = React.useState([false, false, false]);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      rNum: "",
      email: "",
      password: "",
      passwordconfirm: "",
    },
  });
  const password = useRef({});
  password.current = watch("password", "");

  const handleBox = (event) => {
    setChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const onSubmit = (data) => {
    api
      .post(
        "/register",
        qs.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          id: data.rNum,
          email: data.email,
          password: data.password,
          classification: classification,
          alumni: checked,
        })
      )
      .then(function (res) {
        navigate("/login", {replace: true});
      })
      .catch(function (err) {
        setMsg(err.response.data.msg);
      });

    reset({
      firstname: "",
      lastname: "",
      rNum: "",
      email: "",
      password: "",
      passwordconfirm: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name" fullWidth required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="rNum"
                control={control}
                rules={{
                  required: "You must specify an R-Number",
                  maxLength: 8,
                  minLength: 8,
                  pattern: /^\d+$/,
                  message: "Please enter the number itself",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="R-Number"
                    error={errors.rNum}
                    helperText="8-Digit TTU ID. Ex 12345678"
                    fullWidth
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.rNum && <p>{errors.rNum.message}</p>}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    helperText="TTU email - @ttu.edu"
                    error={errors.email}
                    fullWidth
                    required
                  />
                )}
              />
              <Typography
                variant="body2"
                sx={{ textAlign: "left", color: "error.main" }}
              >
                {errors.email && <p>{errors.email.message}</p>}
              </Typography>
            </Grid>
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
                    label="Password"
                    error={errors.password}
                    helperText="Password must be at least 8 characters"
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
                    label="Confirm Password"
                    fullWidth
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
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="classification">
                  Classification/Major
                </InputLabel>
                <Select
                  fullWidth
                  name="Classification"
                  id="classification"
                  label="Class"
                  labelId="classification"
                  value={classification}
                  onChange={(event) => {
                    setClassification(event.target.value);
                  }}
                >
                  <MenuItem value={"EE"}>Electrical Engineering</MenuItem>
                  <MenuItem value={"CMPE"}>Computer Engineering</MenuItem>
                  <MenuItem value={"PHYS"}>Physics</MenuItem>
                  <MenuItem value={"CS"}>Computer Science</MenuItem>
                  <MenuItem value={null}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox onChange={handleBox} />}
                label="Alumni"
              />
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "error.main" }}
          >
            {msg}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Box>
                <Link to="/login">Already have an account? Sign in</Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
