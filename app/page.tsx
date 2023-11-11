"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from './components/appbar';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './theme';


export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getDesignTokens(prefersDarkMode ? 'dark' : 'light')}>
      <CssBaseline />
      {AppBar()}
    </ThemeProvider>
  )
}
