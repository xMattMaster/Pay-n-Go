import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: PaletteMode) => createTheme({
    palette: {
        mode,

        ...(mode === 'light' && {

            primary: {
                main: 'rgb(15, 53, 156)',
            },

            secondary: {
                main: 'rgb(245, 153, 22)',
            },

            text: {
                primary: grey[900],
                secondary: grey[800],
            }
        }),

        ...(mode === 'dark' && {
            primary:
            {
                main: 'rgb(115, 153, 255)',
            },

            secondary: {
                main: 'rgb(245, 153, 22)',
            },

            background: {
                default: 'rgb(32, 32, 32)',
                paper: 'rgb(48, 48, 48)',
            },

            text:
            {
                primary: '#fff',
                secondary: grey[500],
            }
        })
    },
});