import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens } from './../theme';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: 'rgb(15, 53, 156)',
        },
        secondary: {
          main: 'rgb(245, 153, 22)',
        },
    },
});

export default function Component() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    var appbarLogo = "/logo_name.svg";
    if (prefersDarkMode) appbarLogo = "/logo_name_dark.svg"

    return (
        <ThemeProvider theme={getDesignTokens(prefersDarkMode ? 'dark' : 'light')}>
            <CssBaseline />
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small">Da aggiungere</Button>
                <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}>
                        {<img style={{ margin: 'auto', flex: 1, maxHeight: 60 }} src={appbarLogo} alt={"Pay n' Go"} />}
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small">
                    Accedi
                </Button>
            </Toolbar>
        </ThemeProvider>
    )
}