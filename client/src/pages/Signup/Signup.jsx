import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp({user, setUser}) {
  
  const navigate = useNavigate()
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState('')
  const [isPass,isPassValid]=useState(false)
  const [isUsername,isUsernameValid]=useState(false)
  const [entries,setEntries]=useState([])
  const [confirmpass,setConformpass]=useState("")

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
     if(newPassword.length <8)
     {
      setPassword(false);
     }
     
    setPassword(newPassword);
    isPassValid(newPassword.length >= 8);
  };
  const handleEmailChange=(event)=>{
    const k=event.target.value;
    setEmail(k);
 }
 const handleNameChange=(event)=>{
  const k=event.target.value;
  setName(k);
}
const handlePhoneChange=(event)=>{
    const k=event.target.value;
    setPhone(k);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (isPass && isUsername && confirmpass === password) {
      const Entry = { name: name, username: username, password: password, email: email,phone:phone };
      setEntries([entries, Entry]);
      console.log(Entry);
  
      try {
        const res = await axios.post("http://localhost:3001/api/auth/signup",{entries});
        console.log(res.data);
        setUser(res.data.newUser);
        console.log(user);
        localStorage.setItem('user', JSON.stringify(res.data.newUser))
        navigate('/dashboard');
        setEmail("");
        setPassword("");
        setUsername("");
        emptyConfirmpass();
        console.log(confirmpass);
        alert("Logged in successfully");
      } catch (err) {
        // if (err.response && err.response.status === 400) {
        //   alert("Username already exists. Please choose a different username.");
        // } else {
        //   console.log(err);
        // }
        console.log(err)
      }
    } else {
      if(!email || !username  || !phone){
        alert("Fill all the fields!")
      }else{
        if (confirmpass !== password) {
          alert("Password and confirmed pass didn't match");
        } else {
          alert("Invalid username or password. Make sure username is >= 5 characters and password is >= 8 characters");
        }
      }
      
    }
  };

 const handleUsernameChange = (event) => {
  event.preventDefault();
  const newUsername = event.target.value;
  setUsername(newUsername);
  isUsernameValid(newUsername.length >= 5);
};
const confirm=(event)=>{
  event.preventDefault();
  const k=event.target.value
  setConformpass(k)
}
const emptyConfirmpass=()=>{
  setConformpass("");
}
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
      secondary: {
        main: '#000',
      },
      tertiary:{
        main: '#'
      },
      textColor:{
        main: ''
      }
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
      <CssBaseline/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="Your Name"
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
                  autoComplete="Your Username"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  autoComplete="Your Phone"
                  onChange={handlePhoneChange}
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
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete=""
                  name="confirmpass"
                  required
                  fullWidth
                  id="confirmpass"
                  label="Confirm your password"
                  autoFocus
                  onChange={confirm}
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
    </ThemeProvider></Box>
  );
}