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


function Vehicles(props: any) {
    const [dispositivo, setDispositivo] = React.useState(-1);

    const elabVehiclesChanges = (setIsLoading: any, refresh: any) => () => {
        setIsLoading(true);
        setInterval(() => { refresh(); }, 3000);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setDispositivo(event.target.value as unknown as number);
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