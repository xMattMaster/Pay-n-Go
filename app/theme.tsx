import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: PaletteMode) => createTheme ({
    palette: {
        mode,
        primary: {
            ...(mode === 'light' && {
                main: 'rgb(15, 53, 156)',
            }),
            ...(mode === 'dark' && {
                main: 'rgb(115, 153, 255)',
            }),
        },
        ...(mode === 'dark' && {
            background: {
                default: 'rgb(32, 32, 32)',
                paper: 'rgb(48, 48, 48)',
            },
        }),
  
      secondary: {
        ...(mode === 'light' && {
          main: 'rgb(245, 153, 22)',
        }),
        ...(mode === 'dark' && {
          main: 'rgb(245, 153, 22)',
        }),
      },
      ...(mode === 'dark' && {
        background: {
          default: 'rgb(32, 32, 32)',
          paper: 'rgb(48, 48, 48)',
        },
      }),
  
      text: {
        ...(mode === 'light'
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: '#fff',
              secondary: grey[500],
            }),
      },
    },
});