import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import {Link ,Outlet, useNavigate} from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        TTU ECE IEEE student branch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Profile() {
  // Select and box state
  const [classification, setClassification] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [isValid, setValid] = React.useState([false, false, false]);
  const [errMsg, setMsg] = React.useState('');
  const { control, handleSubmit, watch, reset, resetField, setError, clearErrors, formState : {errors} } = useForm({
    defaultValues: {
      firstname: '',
      lastname : '',
      rNum : '',
      email : '',
      password : '',
      passwordconfirm : '',
      classification : classification,
      alumni : checked
    },
  });

  const handleBox = (event) =>{
    setChecked(event.target.checked);
  }
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setDisable(true);
    axios
      .post("/api/register", qs.stringify(data), {timeout: 5000})
      .then(function (res) {
        setDisable(false);
        setMsg(
          `Successfully added ProPoint : ${res.data.id} - ${res.data.description}`
        );
      })
      .catch((err) => {
        if(err.request){
          setMsg("Unable to establish remote server connection.");
          setDisable(false);
        }
        setMsg(err.response.data.msg);
        if(err.response.status === 400){
          console.log([err.response.data.isEmail, err.response.data.isRnum]);
          setValid([err.response.data.Email, err.response.data.Rnum, err.response.data.password]);
        }
      });

    reset({
      firstname: '',
      lastname : '',
      rNum : '',
      email : '',
      password : '',
      passwordconfirm : '',
      classification : classification,
      alumni : checked
    });
  };

   return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box 
            component="form" 
            noValidate 
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}>
            <Grid
              container
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <Controller
                name = "firstName"
                control = {control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  required
                  />
              }/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                name = "lastName"
                control={control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  label= "Last Name"
                  fullWidth
                  required
                  />
                }/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                name= "rNum"
                control = {control}
                render= { ({field}) => 
                  <TextField
                  {...field}
                  label= "R-Number"
                  error = {isValid[1]}
                  helperText = "8-Digit TTU ID. Ex 12345678"
                  fullWidth
                  required
                  />
                }/>
              </Grid>
              <Grid item xs={12}>
                <Controller
                name="email"
                control= {control}
                render= { ({field}) => 
                  <TextField
                  {...field}
                  label="Email Address"
                  error = {isValid[0]}
                  helperText = "TTU email - @ttu.edu"
                  fullWidth
                  required
                  />
                }/>
              </Grid>
              <Grid item xs = {12} md={12}>
                <Controller
                name = "password"
                control = {control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  type="password"
                  label="Password"
                  error = {isValid[2]}
                  helperText = "Must be 8 characters long and contain at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character."
                  fullWidth
                  required
                  />
              }/>
              </Grid>
              <Grid item xs = {12} md={12}>
                <Controller
                name = "passwordconfirm"
                control = {control}
                render = { ({field}) => 
                  <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  required
                  />
              }/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id = "classification">Classification/Major</InputLabel>
                  <Select
                  fullWidth
                  name="Classification"
                  id="classification"
                  label="Class"
                  labelId = "classification"
                  value = {classification}
                  onChange = {(event) => {
                    setClassification(event.target.value);
                  }}
                >
                  <MenuItem value = {'EE'}>Electrical Engineering</MenuItem>
                  <MenuItem value = {'CMPE'}>Computer Engineering</MenuItem>
                  <MenuItem value = {'PHYS'}>Physics</MenuItem>
                  <MenuItem value = {'CS'}>Computer Science</MenuItem>
                  <MenuItem value = {null}>Other</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control = {
                  <Checkbox onChange = {handleBox} />
                } label = "Alumni"/>
              </Grid>
            </Grid>
            <Typography variant = "body1" gutterBottom component='h5' sx = {{textAlign : 'center', color:'error.main'}}>
              {errMsg}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Changes
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Box>
                <Link to='/'>
                  Return to Home Page
                </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}