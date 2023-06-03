import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { login } from '../api/UserAPI';
import { useNavigate  } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackText, setSnackText] = useState("")
  const [TCK, setTCK] = useState("")
  const [password, setPassword] = useState("")
  

  async function handleSubmit(event){
    event.preventDefault();
    login(TCK, password).then(loggedin=> {
      setTCK("")
      setPassword("")
      if (loggedin) {
        navigate('/home');
      }
      else {
        setSnackText("Your TCK or password is not valid. Try again")
        setSnackOpen(true)
      }
    })
  };

  function handleSnackClose() {
    setSnackOpen(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="tckNumber"
              label="TCK Number"
              name="tckNumber"
              autoComplete="tckNumber"
              value={TCK}
              onChange={e=>{setTCK(e.target.value)}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={e=>{setPassword(e.target.value)}}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs/>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical:"bottom",horizontal:"right" }}>
          <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
              {snackText}
          </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}