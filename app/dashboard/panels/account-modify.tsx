import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateValidationError } from '@mui/x-date-pickers/models';
import dayjs from 'dayjs';

function AccountModify(props: any) {
    let nome = props.value["Nome"];
    let cognome = props.value["Cognome"];
    let codiceFiscale = props.value["CodiceFiscale"];
    let dataNascitaRaw = props.value["DataNascita"];
    let dataNascita = dayjs(dataNascitaRaw, "YYYY-MM-DD");
    let indirizzo = props.value["Indirizzo"];

    const [dateError, setDateError] = React.useState<DateValidationError | null>(null);
    const checkAge = dayjs().startOf('day').subtract(18, 'year');
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

    return (
        <Box>
            <BrowserView>
                <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nome"
                            defaultValue= {nome}
                            fullWidth
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Cognome"
                            defaultValue= {cognome}
                            fullWidth
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Codice fiscale"
                            defaultValue= {codiceFiscale}
                            fullWidth
                            inputProps={{
                                maxLength: 16, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            maxDate={checkAge}
                            format='DD/MM/YYYY'
                            defaultValue={dataNascita}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    id: "dateOfBirth",
                                    required: true,
                                    helperText: dateErrorMessage,
                                    name: "dateOfBirth",
                                },
                            }}
                            onError={(newError) => setDateError(newError)}
                            label="Data di nascita"
                        />
                    </LocalizationProvider>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Indirizzo"
                            defaultValue= {indirizzo}
                            fullWidth
                            inputProps={{
                                maxLength: 40
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ marginTop: 2 }} variant="outlined" onClick={props.changePanel}>Salva</Button>
            </BrowserView>

            <MobileView>
            <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Nome"
                            defaultValue= {nome}
                            fullWidth
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Cognome"
                            defaultValue= {cognome}
                            fullWidth
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Codice fiscale"
                            defaultValue= {codiceFiscale}
                            fullWidth
                            inputProps={{
                                maxLength: 16, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disableFuture
                            maxDate={checkAge}
                            format='DD/MM/YYYY'
                            defaultValue={dataNascita}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
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
                    <Grid xs={12}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Indirizzo"
                            defaultValue= {indirizzo}
                            fullWidth
                            inputProps={{
                                maxLength: 40
                            }}
                        />
                    </Grid>
                </Grid>
                <Button fullWidth variant="outlined" onClick={props.changePanel}>Salva</Button>
            </MobileView>
        </Box>
    );
}

export default AccountModify;