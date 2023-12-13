"use client"
import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@/app/components/appbar';
import Footer from '@/app/components/footer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { TaskAlt, Speed, SavingsOutlined } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '@/app/theme';


const prosItem: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = getDesignTokens(prefersDarkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12}>
          {AppBar(theme)}
        </Grid>

        <Grid xs={12}>
          <Paper square
            sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#fff',
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url("/homepage/hpHighway.webp")`,
            }}>
            {/* Increase the priority of the background image */}
            {<img style={{ display: 'none' }} src={"/homepage/hpHighway.webp"} alt={"Sfondo autostrada"} />}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
              }}
            />
            <Grid container spacing={2}>
              <Grid md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                  }}
                >
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {'Chi siamo'}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {'Le nostre soluzioni ti consentono di viaggiare in tutta Italia in completa serenità. Dici addio alle file interminabili ai caselli autostradali, e dedica più tempo a ciò che è veramente importante.'}
                  </Typography>
                  <Link variant="subtitle1" href="/sign-in">
                    {'Scopri di più!'}
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={12} md={4}>
          <Box sx={prosItem}>
            <TaskAlt sx={{ height: 55, width:55 }} />
            <Typography variant="h6" sx={{ my: 5 }}>
              {'Facile'}
            </Typography>
            <Typography variant="subtitle1" align='center'>
              {'Leave it and forget it! Lascia il dispositivo sul cruscotto e guida senza pensieri. '}
              {'Saremo al tuo fianco quando ne hai più bisogno!'}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box sx={prosItem}>
            <Speed sx={{ height: 55, width:55 }} />
            <Typography variant="h6" sx={{ my: 5 }}>
              {'Veloce'}
            </Typography>
            <Typography variant="subtitle1" align='center'>
              {'Code chilometriche all\'uscita dell\'autostrada? Nessun problema! Con noi salti la '}
              {'fila e vai diretto verso la tua destinazione! Mai più estenuanti attesa al casello!'}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={4}>
          <Box sx={prosItem}>
          <SavingsOutlined sx={{ height: 55, width:55 }} />
            <Typography variant="h6" sx={{ my: 5 }}>
              {'Conveniente'}
            </Typography>
            <Typography variant="subtitle1" align='center'>
              {'Risparmia carburante, tempo ed energie! Ma non solo; con il servizio fedeltà ricevi '}
              {'sconti esclusivi presso la nostra fitta rete di partner!'}
            </Typography>
          </Box>
        </Grid>

        <Grid xs={12}>
          {Footer(theme)}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
