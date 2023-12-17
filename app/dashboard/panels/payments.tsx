import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Payments(props: any) {
    let codice = props.value["CodicePagamento"];
    let tipo = props.value["TipoPagamento"];

    return (
        <Box>
            <BrowserView>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                        <TextField
                            id="tipoPagamento"
                            label="Metodo di pagamento"
                            defaultValue= {tipo}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12} md={8}>
                        <TextField
                            id="codicePagamento"
                            label="Codice di pagamento"
                            defaultValue= {codice}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Button sx={{ my: 2 }} variant="outlined" onClick={props.changePanel}>Modifica</Button>
            </BrowserView>

            <MobileView>
            <Grid container spacing={2}>
                    <Grid xs={12}>
                        <TextField
                            id="tipoPagamento"
                            label="Metodo di pagamento"
                            defaultValue= {tipo}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="codicePagamento"
                            label="Codice di pagamento"
                            defaultValue= {codice}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Button fullWidth sx={{ my: 2 }} variant="outlined" onClick={props.changePanel}>Modifica</Button>
            </MobileView>
        </Box>
    );
}

export default Payments;