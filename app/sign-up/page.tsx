"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '../theme';


async function registration(params: string) {
  
  let fetchData = {
   "method": "POST",
   "body": params,
   "headers" : {
    "Accept": "application/json",
    "Content-Type" : "application/json"
   }
  };
  

  const res = await fetch('http://basidati.altervista.org/api/registration.php', fetchData);
  const res_final = await res.json();
  return res_final;
   
}


export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let params = {
      "email" : data.get('email'),
      "password": data.get('password')
    };
    
    let params_json = JSON.stringify(params);

    /*console.log({
      email: data.get('email'),
      password: data.get('password'),
      params: params_json
    });*/

    registration(params_json).then(response => console.log(response)); //TODO: Remove console log

  };
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <ThemeProvider theme={getDesignTokens(prefersDarkMode ? 'dark' : 'light')}>
      <Container component="main">
        <CssBaseline />
        <Grid container spacing={2} disableEqualOverflow>
          <Grid xs={12} sm={8} md={5} smOffset={2} mdOffset={3.5}>
            <Paper
              sx={{
                marginTop: 8,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              elevation={2}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrazione
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Nome"
                      autoFocus
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Cognome"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registrati
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid>
                    <Link href="/sign-in" variant="body2">
                      Hai già un account? Accedi. 
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}