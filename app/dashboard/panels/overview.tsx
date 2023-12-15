import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Overview(props: any) {
    let nome = props.value["Nome"];
    let cognome = props.value["Cognome"];
    return (
        <Box>
            <BrowserView>
                <Typography variant='h4' gutterBottom>
                    Benvenuto, {nome} {cognome}!
                </Typography>
            </BrowserView>

            <MobileView>
                <Typography variant='h4' gutterBottom>
                    Benvenuto, {nome} {cognome}!
                </Typography>
            </MobileView>
        </Box>
    );
}

export default Overview;