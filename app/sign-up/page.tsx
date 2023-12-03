"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
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
import dayjs from 'dayjs';


async function registration(params: string) {

    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    const res = await fetch('https://basidati.altervista.org/scripts/registration.php', fetchData);
    const res_final = await res.json();
    return res_final;
}


export default function SignUp() {

    const checkAge = dayjs().startOf('day').subtract(18, 'year');
    const [dateError, setDateError] = React.useState<DateValidationError | null>(null);
    const dateErrorMessage = React.useMemo(() => {
        switch (dateError) {
            case 'maxDate':
            case 'minDate': {
                return 'Devi essere maggiorenne';
            }

            case 'invalidDate': {
                return 'Data non valida';
            }

            default: {
                return '';
            }
        }
    }, [dateError]);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const [status, setStatusBase] = React.useState("");
    const setStatus = (registrationError: string) => setStatusBase(registrationError);

    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = React.useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitBtnDisabled(true);
        document.getElementById('registrationButton');
        const data = new FormData(event.currentTarget);
        var bDayNorm = dayjs().format("YYYY-MM-DD");
        if (data.get('dateOfBirth') != "") {
            bDayNorm = dayjs(data.get('dateOfBirth')?.toString(), 'DD/MM/YYYY').format('YYYY-MM-DD');
        }
        let params = {
            "email": data.get('email'),
            "password": data.get('password'),
            "firstName": data.get('firstName'),
            "lastName": data.get('lastName'),
            "cfId": data.get('cfId'),
            "dateOfBirth": bDayNorm,	// MySQL DATE type
            "address": data.get('address')
        };

        /*console.log({
            "email": data.get('email'),
            "password": data.get('password'),
            "firstName": data.get('firstName'),
            "lastName": data.get('lastName'),
            "cfId": data.get('cfId'),
            "dateOfBirth": bDayNorm,	// MySQL DATE type
            "address": data.get('address')
        });*/

        let params_json = JSON.stringify(params);
        /* Mega-check validità */
        var regErr = 0;
        if (params.firstName === "") { setStatus("Il campo \"Nome\" non può essere vuoto."); regErr = 1; }
        else if (params.lastName == "") { setStatus("Il campo \"Cognome\" non può essere vuoto."); regErr = 1; }
        else if (params.dateOfBirth == dayjs().startOf('day').format('YYYY-MM-DD')) { setStatus("Il campo \"Data\" non è valido."); regErr = 1; }
        else if (params.cfId == "") { setStatus("Il campo \"Codice fiscale\" non può essere vuoto."); regErr = 1; }
        else if (params.address == "") { setStatus("Il campo \"Indirizzo\" non può essere vuoto."); regErr = 1; }
        else if (params.email == "") { setStatus("Il campo \"Email\" non può essere vuoto."); regErr = 1; }
        else if (params.password == "") { setStatus("Il campo \"Password\" non può essere vuoto."); regErr = 1; }
        if (regErr == 1) {
            setSnackbarOpen(true);
            setIsSubmitBtnDisabled(false);
            return;
        }
        registration(params_json).then(response => 
            {
                if (response["res"] == 1) {
                    setInterval(() => { window.location.replace("/sign-in"); }, 3000);
                    setStatus("Registrazione completata con successo.");
                    setSnackbarOpen(true);
                }
                else
                {
                    setStatus("C'è stato un errore nell'elaborazione della richiesta.");
                    setSnackbarOpen(true);
                    setIsSubmitBtnDisabled(false);
                }
            });
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
                            <Typography>
                                <strong>Non inserire dati sensibili o personali reali!</strong> Le informazioni qui inserite
                                saranno aggiunte in un database del quale non è garantita la protezione e verranno usate
                                per scopi didattici.
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
                                            inputProps={{ maxLength: 20 }}
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
                                            inputProps={{ maxLength: 20 }}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={5}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                disableFuture
                                                maxDate={checkAge}
                                                format='DD/MM/YYYY'
                                                slotProps={{
                                                    textField: {
                                                        id: "dateOfBirth",
                                                        required: true,
                                                        helperText: dateErrorMessage,
                                                        name: "dateOfBirth"
                                                    },
                                                }}
                                                onError={(newError) => setDateError(newError)}
                                                label="Data di nascita"
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid xs={12} sm={7}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="cfId"
                                            label="Codice fiscale"
                                            name="cfId"
                                            inputProps={{ maxLength: 16, style: { textTransform: "uppercase" } }}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Indirizzo"
                                            name="address"
                                            autoComplete="street-address"
                                            inputProps={{ maxLength: 40 }}
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
                                            inputProps={{ maxLength: 50 }}
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
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={isSubmitBtnDisabled}
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
                {status ?
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message={status}
                    /> : null}

            </Container>
        </ThemeProvider>
    );
}