"use client"
import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { GitHub } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const FooterIcon: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

export default function Footer(theme: Theme) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    var MuiIcon = "/mui.svg";
    if (prefersDarkMode) MuiIcon = "/mui_dark.svg";

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper elevation={4} sx={{ margin: 4, display: 'flex' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2} sx={FooterIcon}>
                        <Box component="a" href="https://github.com/xMattMaster/Pay-n-Go">
                            <GitHub sx={{ width:32, height:32, m: 2 }} />
                        </Box>
                        <Box component="a" href="https://mui.com">
                            {<img style={{ width:32, height:32, margin: 16 }} src={MuiIcon} alt={"Mui"}></img>}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Box sx={{ m: 2 }}>
                            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                                <Box component="li" sx={{ py: 0.5 }}>
                                    <Link href="/terms" rel="terms-of-service" title="Termini di servizio">{'Termini di servizio'}</Link>
                                </Box>
                                <Box component="li" sx={{ py: 0.5 }}>
                                    <Link href="https://www.iubenda.com/privacy-policy/32137593" rel="privacy-policy" title="Privacy policy">{'Privacy policy'}</Link>
                                </Box>
                                <Box component="li" sx={{ py: 0.5 }}>
                                    <Link href="https://www.iubenda.com/privacy-policy/32137593/cookie-policy" rel="privacy-policy" title="Cookie policy">{'Cookie policy'}</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ margin: 4 }}>
                        <Typography variant="caption">
                        {'Questo sito web è il frutto di un progetto accademico, nessun prodotto pubblicizzato è realmente '}
                        {'in commercio. L\'immagine nella homepage è stata generata tramite intelligenza artificiale di '}
                        <Link href="https://www.canva.com" rel="sponsored" title="Canva">
                            {'Canva'}
                        </Link>
                        {'. Progetto sotto licenza '}
                        <Link href="https://github.com/xMattMaster/Pay-n-Go/blob/main/LICENSE" rel="license" title="Licenza AGPL-3.0">
                            {'AGPL-3.0'}
                        </Link>
                        {'.'}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}