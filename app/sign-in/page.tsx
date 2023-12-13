"use client"
import * as React from 'react';
import Cookies from 'universal-cookie';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '../theme';


const cookies = new Cookies(null, { path: "/", sameSite: "strict" });

function save_session(user_id: string, nome: string, cognome: string) {
    cookies.set("user_id", user_id);
    cookies.set("nome", nome);
    cookies.set("cognome", cognome);
}

async function login(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };
    const res = await fetch('https://basidati.netsons.org/scripts/login.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

export default function SignIn() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const isLoggedIn = cookies.get("user_id");

    if (isLoggedIn) {
        return (window.location.replace("/dashboard"));
    }
    else {
        const [snackbarOpen, setSnackbarOpen] = React.useState(false);
        const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackbarOpen(false);
        };

        const [status, setStatusBase] = React.useState("");
        const setStatus = (loginError: string) => setStatusBase(loginError);

        const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = React.useState(false);


        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsSubmitBtnDisabled(true);
            document.getElementById('loginButton');
            const data = new FormData(event.currentTarget);

            let params = {
                "email": data.get('email'),
                "password": data.get('password')
            };

            let loginError = 0;

            if (params.email === "") { setStatus("Il campo \" Email \" non può essere vuoto."); loginError = 1; }
            if (params.password === "") { setStatus("Il campo \"Password\" non può essere vuoto. "); loginError = 1; }

            if (loginError == 1) {
                setSnackbarOpen(true);
                setIsSubmitBtnDisabled(false);
                return;
            }
            let params_json = JSON.stringify(params);

            login(params_json).then(response => {
                if (response["res"] == 1) {
                    let id = response["id"];
                    let nome = response["nome"];
                    let cognome = response["cognome"];
                    save_session(id, nome, cognome);
                    setInterval(() => { window.location.replace("/dashboard"); }, 3000);
                    setStatus("Login completato con successo.");
                    setSnackbarOpen(true);
                } else if (response["res"] == 0) {
                    setStatus("La password inserita è errata.");
                    setSnackbarOpen(true);
                    setIsSubmitBtnDisabled(false);
                } else if (response["res"] == -1) {
                    setStatus("Nessun utente associato all'email inserita.");
                    setSnackbarOpen(true);
                    setIsSubmitBtnDisabled(false);
                } else {
                    let msg = response["message"];
                    setStatus(`C'è stato un errore nell'elaborazione della richiesta: ${msg}`);
                    setSnackbarOpen(true);
                    setIsSubmitBtnDisabled(false);
                }
            })

        };

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
                                    Accesso
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        inputProps={{ maxLength: 50 }}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        inputProps={{ maxLength: 50 }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        disabled={isSubmitBtnDisabled}
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Accedi
                                    </Button>
                                    <Grid container>
                                        <Grid xs>
                                            <Link href="#" variant="body2">
                                                {"Password dimenticata?"}
                                            </Link>
                                        </Grid>
                                        <Grid>
                                            <Link href="/sign-up" variant="body2">
                                                {"Non hai un account? Registrati."}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    {status ?
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                            message={status}
                        /> : null}
                </Container>
            </ThemeProvider>
        )
    }
}