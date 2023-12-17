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


async function modifyPHP(params: string) {
    let fetchData = {
        "method": "POST",
        "body": params,
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    const res = await fetch('https://basidati.netsons.org/scripts/dashboard_payments_modify.php', fetchData);
    const res_final = await res.json();
    return res_final;
}

function PaymentsModify(props: any) {
    const [tipoPagamento, setTipoPagamento] = React.useState(props.value["TipoPagamento"]);
    let codice = props.value["CodicePagamento"];
    const valueRef = React.useRef();
    const user_data = React.useContext(UserData);

   

    const elabPaymentsChanges = (setIsLoading: any, refresh: any) => () => {
        setIsLoading(true);

        const code = valueRef.current.value;

        let params = {
            "user_id": user_data.userId,
            "method": tipoPagamento,
            "code": code
        };
    
        let params_json = JSON.stringify(params);
    
        modifyPHP(params_json).then(response => {
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
                                defaultValue="Conto"
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
                            inputRef={valueRef}
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
                            inputRef={valueRef}
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