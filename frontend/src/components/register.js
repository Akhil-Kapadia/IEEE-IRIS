import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import {BrowserRouter as Route, Outlet, useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.ieee.org/">
        TTU ECE IEEE student branch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  // Select and box state
  const [classification, setClassification] = React.useState('');
  const [checked, setChecked] = React.useState(null);
  const [isValid, setValid] = React.useState([false, false]);
  const [errMsg, setMsg] = React.useState('');
  const handleBox = (event) =>{
    setChecked(event.target.checked);
  }
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      firstname: data.get('firstName'),
      lastname : data.get('lastName'),
      id : data.get('rNum'),
      email : data.get('email'),
      password : data.get('password'),
      classification : classification,
      alumni : checked
    };

    // Send form data to backend and handle errors
    axios.post('/api/register', qs.stringify(data))
      .then(function (res) {
        navigate('/login');
      })
      .catch(function (err){
        setMsg(err.response.data.msg);
        if(err.response.status === 400){
          setValid([err.response.data.isEmail, err.response.data.isRnum]);
        }
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="rNum"
                  label="R-Number"
                  name="rNum"
                  error = {isValid[1]}
                  helperText = "8-Digit TTU ID. Ex 12345678"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error = {isValid[0]}
                  helperText = "TTU email - @ttu.edu"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
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
              {/* Uncomment below button if we ever decide to do newsletter*/}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want emails about IEEE events at TTU through email."
                />
              </Grid> */}
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
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
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