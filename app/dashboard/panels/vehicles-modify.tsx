import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { UserData } from '@/app/components/contextProvieder';

async function addVehiclePHP(params: string) {
    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_add_vehicle.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

function Vehicles(props: any) {
    const [dispositivo, setDispositivo] = React.useState(-1);

    const user_data = React.useContext(UserData);
    const targa_ref = React.useRef();
    const modello_ref = React.useRef();
    
    const elabVehiclesChanges = (setIsLoading: any, refresh: any) => () => {
        setIsLoading(true);

        let params = {
            "user_id": user_data.userId,
            "targa": targa_ref.current.value,
            "model": modello_ref.current.value,
            "device": dispositivo
        }

        let params_json = JSON.stringify(params);

        addVehiclePHP(params_json).then(response => {
            if (response["res"] == -1) {
                let msg = response["message"];
                console.log(`ERROR ADD: ${msg}`);
            }

            if (response["res"] == 1) {
                setInterval(() => { refresh(); }, 250);
            }
        })
    }

    const handleChange = (event: SelectChangeEvent) => {
        setDispositivo(event.target.value as unknown as number);
        console.log(dispositivo);
    };

    return (
        <Box>
            <BrowserView>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="modello"
                            label="Modello"
                            fullWidth
                            inputRef={modello_ref}
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={8}>
                        <TextField
                            required
                            id="targa"
                            label="Targa"
                            fullWidth
                            inputRef={targa_ref}
                            inputProps={{
                                maxLength: 7, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={4}>
                        <FormControl fullWidth required>
                            <InputLabel id="dispositiviSelezionabiliLabel">Dispositivo</InputLabel>
                            <Select
                                labelId="dispositiviSelezionabiliLabel"
                                id="tipoPagamentoSelect"
                                defaultValue={"-1"}
                                label="Dispositivo"
                                onChange={handleChange}
                            >
                                <MenuItem value={"-1"}>Nuovo</MenuItem>
                                {
                                    props.value.map((device:any, index:number) =>

                                    <MenuItem key={index} value={device["Dispositivo"]}>
                                      {device["Dispositivo"]}
                                    </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button sx={{ my: 2, marginRight: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button sx={{ my: 2 }} variant="outlined"
                    onClick={elabVehiclesChanges(props.setIsLoading, props.refresh)}>Salva</Button>
            </BrowserView>

            <MobileView>
            <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="modello"
                            label="Modello"
                            fullWidth
                            inputRef={modello_ref}
                            inputProps={{
                                maxLength: 20
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="targa"
                            label="Targa"
                            fullWidth
                            inputRef={targa_ref}
                            inputProps={{
                                maxLength: 7, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="dispositiviSelezionabiliLabel">Dispositivo</InputLabel>
                            <Select
                                labelId="dispositiviSelezionabiliLabel"
                                id="tipoPagamentoSelect"
                                defaultValue={"-1"}
                                label="Dispositivo"
                                onChange={handleChange}
                            >
                                <MenuItem value={"-1"}>Nuovo</MenuItem>
                                {
                                    props.value.map((device:any, index:number) =>

                                    <MenuItem key={index} value={device["Dispositivo"]}>
                                      {device["Dispositivo"]}
                                    </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button fullWidth sx={{ marginTop: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button fullWidth sx={{ my: 2 }} variant="outlined"
                    onClick={elabVehiclesChanges(props.setIsLoading, props.refresh)}>Salva</Button>
            </MobileView>
        </Box>
    );
}

export default Vehicles;