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
import { UserData } from '@/app/components/contextProvieder';


async function accModifyPHP(params: string) {
    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_account_modify.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

function AccountModify(props: any) {
    const [isDisabled, setDisabled] = React.useState(false);
    let nome = props.value["Nome"];
    let cognome = props.value["Cognome"];
    let codiceFiscale = props.value["CodiceFiscale"];
    let dataNascitaRaw = props.value["DataNascita"];
    let dataNascita = dayjs(dataNascitaRaw, "YYYY-MM-DD");
    let indirizzo = props.value["Indirizzo"];
    const user_data = React.useContext(UserData);

    const name_ref = React.useRef();
    const surname_ref = React.useRef();
    const cf_ref = React.useRef();
    const date_ref = React.useRef();
    const location_ref = React.useRef();

    const [dateError, setDateError] = React.useState<DateValidationError | null>(null);
    const checkAge = dayjs().startOf('day').subtract(18, 'year');
    const dateErrorMessage = React.useMemo(() => {
        switch (dateError) {
            case 'maxDate':
            case 'minDate': {
                setDisabled(true);
                return 'Devi essere maggiorenne';
            }

            case 'invalidDate': {
                setDisabled(true);
                return 'Data non valida';
            }

            default: {
                setDisabled(false);
                return '';
            }
        }
    }, [dateError]);

    const elabAccountChanges = (setIsLoading: any, refresh: any) => () => {
        setIsLoading(true);

        const name = name_ref.current.value;
        const surname = surname_ref.current.value;
        const cf = cf_ref.current.value;
        const date = dayjs(date_ref.current.value, "DD/MM/YYYY").format("YYYY-MM-DD");
        const location = location_ref.current.value;
        

        if (!isDisabled) {

        let params = {
            "user_id": user_data.userId,
            "Nome": name,
            "Cognome": surname,
            "Data": date,
            "Cf": cf,
            "Indirizzo": location
        };
    
        let params_json = JSON.stringify(params);
    
        accModifyPHP(params_json).then(response => {
            if (response["res"] == -1) {
                let msg = response["message"];
                console.log(`ERROR UPDATE: ${msg}`);
            }
            if(response["res"] == 1) {
                console.log("OK UPDATE");
                setInterval(() => { refresh(); }, 250);
            }
        });
    }
}
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
                            inputRef={name_ref}
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
                            inputRef={surname_ref}
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
                            inputRef={cf_ref}
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
                                    inputRef: date_ref,
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
                            inputRef={location_ref}
                            inputProps={{
                                maxLength: 40
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ my: 2, marginRight: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button sx={{ my: 2 }} variant="outlined" disabled={isDisabled}
                    onClick={elabAccountChanges(props.setIsLoading, props.refresh)}>Salva</Button>
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
                <Button fullWidth sx={{ marginTop: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button fullWidth sx={{ my: 2 }} variant="outlined"
                    onClick={elabAccountChanges(props.setIsLoading, props.refresh)}>Salva</Button>
            </MobileView>
        </Box>
    );
}

export default AccountModify;