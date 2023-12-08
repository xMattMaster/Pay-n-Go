"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@/app/components/appbar';
import Footer from '@/app/components/footer';
import Grid from '@mui/material/Unstable_Grid2';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '@/app/theme';


export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getDesignTokens(prefersDarkMode ? 'dark' : 'light')}>
      <CssBaseline />
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12}>
          {AppBar()}
        </Grid>

        

        <Grid xs={12}>
          {Footer()}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
