import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Link, Grid, Box, Typography, Container, CssBaseline, Avatar, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setUser, setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonee, setPhonee] = useState('');
  const [confirmpass, setConformpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const navigate = useNavigate()
  const [isValidPhone, setIsValidPhone] = useState(false)
  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    if (newPassword.length < 8) {
      setPassword(false);
    }

    setPassword(newPassword);
    setIsValidPassword(newPassword.length >= 8);
  };

  React.useEffect(()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email])

  useEffect(() => {
    const isValid =
      password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && 
      /\d/.test(password) && /[!@#$%^&*]/.test(password); 
    setIsValidPassword(isValid);
  }, [password]);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleEmailChange = (event) => {
    const k = event.target.value;
    setEmail(k);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(k));
  };

  const handleNameChange = (event) => {
    const k = event.target.value;
    setName(k);
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  useEffect(()=>{
    if(phonee.length == 10){
      setIsValidPhone(true)
    }
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      return alert("Invalid Email");
    }
    if (!isValidPassword) {
      return alert("Make a strong password");
    }
    if (confirmpass !== password) {
      return alert("Password and confirmed password didn't match");
    }
    if(!isValidPhone){
      return alert('Enter Valid Contact Number')
    }
    console.log(phonee)
    let phone = countryCode+phonee
    const Entry = { name, username, password, email, phone };
    console.log(Entry);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/signup", Entry);
      navigate('/signin')
      
      setEmail("");
      setPassword("");
      setUsername("");
      setConformpass("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
    },
  });

  return (
    <Box
      bgcolor="fff"
      color="black"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="0px"
    >
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={handleUsernameChange}
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
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    defaultValue={'+1'}
                    label="Country Code"
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    variant="outlined"
                    style={{ width: '100%' }}
                  >
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+91">+91 (IN)</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone number"
                    name="phone"
                    autoComplete="Your Phone"
                    onChange={(e)=>{
                      setPhonee(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpass"
                    label="Confirm Password"
                    type={showPassword2 ? "text" : "password"}
                    id="confirmpass"
                    autoComplete="new-password"
                    onChange={(e) => setConformpass(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword2}>
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
