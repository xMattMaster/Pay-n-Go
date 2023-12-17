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

function PaymentsModify(props: any) {
    const [tipoPagamento, setTipoPagamento] = React.useState(props.value["TipoPagamento"]);
    let codice = props.value["CodicePagamento"];

    const elabPaymentsChanges = (setIsLoading: any, refresh: any) => () => {
        setIsLoading(true);
        setInterval(() => { refresh(); }, 3000);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setTipoPagamento(event.target.value as string);
    };

    return (
        <Box>
            <BrowserView>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <FormControl fullWidth required>
                            <InputLabel id="tipoPagamentoSelectLabel">Metodo di pagamento</InputLabel>
                            <Select
                                labelId="tipoPagamentoSelectLabel"
                                id="tipoPagamentoSelect"
                                value={tipoPagamento}
                                label="Metodo di pagamento"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Conto"}>Conto</MenuItem>
                                <MenuItem value={"Carta"}>Carta</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <TextField
                            required
                            id="codicePagamento"
                            label="Codice di pagamento"
                            defaultValue={codice}
                            fullWidth
                            inputProps={{
                                maxLength: 30, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ my: 2, marginRight: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button sx={{ my: 2 }} variant="outlined"
                    onClick={elabPaymentsChanges(props.setIsLoading, props.refresh)}>Salva</Button>
            </BrowserView>

            <MobileView>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="tipoPagamentoSelectLabel">Metodo di pagamento</InputLabel>
                            <Select
                                labelId="tipoPagamentoSelectLabel"
                                id="tipoPagamentoSelect"
                                value={tipoPagamento}
                                label="Metodo di pagamento"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Conto"}>Conto</MenuItem>
                                <MenuItem value={"Carta"}>Carta</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            required
                            id="codicePagamento"
                            label="Codice di pagamento"
                            defaultValue={codice}
                            fullWidth
                            inputProps={{
                                maxLength: 30, style: { textTransform: "uppercase" }
                            }}
                        />
                    </Grid>
                </Grid>
                <Button fullWidth sx={{ marginTop: 2 }} variant="outlined" onClick={props.cancel}>Annulla</Button>
                <Button fullWidth sx={{ my: 2 }} variant="outlined"
                    onClick={elabPaymentsChanges(props.setIsLoading, props.refresh)}>Salva</Button>
            </MobileView>
        </Box>
    );
}

export default PaymentsModify;