import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

function Account(props: any) {
    let nome = props.value["Nome"];
    let cognome = props.value["Cognome"];
    let codiceFiscale = props.value["CodiceFiscale"];
    let dataNascitaRaw = props.value["DataNascita"];
    let dataNascita = dayjs(dataNascitaRaw, "YYYY-MM-DD").format("DD/MM/YYYY");
    let indirizzo = props.value["Indirizzo"];

    return (
        <Box>
            <BrowserView>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Nome"
                            defaultValue= {nome}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Cognome"
                            defaultValue= {cognome}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Codice fiscale"
                            defaultValue= {codiceFiscale}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Data di nascita"
                            defaultValue= {dataNascita}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Indirizzo"
                            defaultValue= {indirizzo}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ marginTop: 2 }} variant="outlined" onClick={props.changePanel}>Modifica dati</Button>
            </BrowserView>

            <MobileView>
            <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Nome"
                            defaultValue= {nome}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Cognome"
                            defaultValue= {cognome}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Codice fiscale"
                            defaultValue= {codiceFiscale}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Data di nascita"
                            defaultValue= {dataNascita}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Indirizzo"
                            defaultValue= {indirizzo}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Button fullWidth variant="outlined" onClick={props.changePanel}>Modifica dati</Button>
            </MobileView>
        </Box>
    );
}

export default Account;