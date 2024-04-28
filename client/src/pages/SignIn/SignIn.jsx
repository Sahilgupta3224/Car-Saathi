import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {auth,provider} from "../firebase.js"
import {signInWithPopup} from "firebase/auth"
import GoogleButton from 'react-google-button'
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#f44336", // Change the primary color to a shade of red
    },
    secondary: {
      main: "#f44336", // Change the secondary color to a shade of blue
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","), // Set the default font to Roboto
  },
});

export default function SignInSide({ user, setUser,isLoggedIn,setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleForget = async (e)=>{
    e.preventDefault();
    if(!email){
      return toast.warning('Fill email')
    }

    try {
      const res = await axios.post('http://localhost:3001/api/auth/forget-password', { email });
      alert('Reset token sent to your email');
      // console.log(res.data.resetToken)
      const resetToken = res.data.resetToken;
      navigate(`/resetPassword?token=${resetToken}`)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }  else {
        console.log(error);
      }
    }
  }
  const handleSubmit = async (event) => {
    
    setIsLoading(true);
    event.preventDefault();
    const formdata = {
      email: email,
      password: password
    }
    console.log(formdata)
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/signin",
        formdata
      );
      setUser(res.data.others);
      setIsLoggedIn(true)
      console.log("sign in info",res.data);
      localStorage.setItem("user", JSON.stringify(res.data.others));
      if (res.data.message) {
        alert(res.data.message);
      } else {
        navigate("/");
      }
    } catch (err) {
      if (
        (err.response && err.response.status === 400) ||
        err.response.status === 500
      ) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googlesekar = (req,res)=>{
    signInWithPopup(auth,provider).then((result)=>{
      console.log(result);
      console.log(result.user.photoURL);
      axios
            .post("http://localhost:3001/api/auth/google", {
              username: result.user.displayName,
              email: result.user.email,
              image: result.user.photoURL,
            })
            .then((res) => {
              console.log(res.data)
              // setUser(res.data)
            localStorage.setItem(`user${user._id}`, JSON.stringify(res.data))
              // navigate("/dashboard")
            });
    }).catch((err)=>{console.log(err)})``
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          width={1 / 2}
          sx={{
            backgroundImage:
              "url(https://cdn.blablacar.com/kairos/assets/images/driver-c3bdd70e6a29c6af9ef1.svg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "small",
            backgroundPosition: "left",
            width: "50%",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
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
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/signin" variant="body2" onClick={handleForget}>
                    {"Forget Password"}
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
      <GoogleButton  onClick={googlesekar}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}