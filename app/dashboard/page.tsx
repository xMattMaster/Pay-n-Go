"use client";
import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Cookies from 'universal-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@/app/components/appbar';
import AppBarMobile from '@/app/dashboard/components/appbarMobile';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '@/app/theme';
import { useUserData } from '../components/contextProvieder';
import NoSSR from '@/app/components/noSSR';
import DrawerItems from '@/app/dashboard/components/drawer'


const cookies = new Cookies(null, { path: "/", sameSite: "strict" });

export default function Dashboard() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [selectedDrawerElement, setSelectedDrawerElement] = React.useState("panoramica");
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = getDesignTokens(prefersDarkMode ? 'dark' : 'light');
    const UserData = useUserData();

    React.useEffect(() => {
        if (!UserData.userId) window.location.replace("/sign-in");
        setIsLoading(false);
    });

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NoSSR>
                {isLoading ?
                    <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Stack direction="column" spacing={2}>
                            <img src="/logo_name_dark.svg" />
                            <CircularProgress color="inherit" sx={{ alignSelf: "center" }} />
                        </Stack>
                    </Backdrop> : null}

                <BrowserView>
                    <Grid container spacing={0} disableEqualOverflow>
                        <Grid xs={12}>
                            {AppBar(theme)}
                        </Grid>

                        <Grid xs={6} sm={4} md={3} lg={2}>
                            <Box component="div"
                                style={{
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    height: 'calc(100vh - 64px)',
                                    overflow: 'auto'
                                }}>
                                <DrawerItems selected={selectedDrawerElement} select={setSelectedDrawerElement} />
                            </Box>
                        </Grid>

                        <Grid xs={6} sm={8} md={9} lg={10}>
                            <Paper elevation={2}
                                sx={{
                                    height: 'calc(100vh - 64px)',
                                    p: 2, borderRadius: 2,
                                    overflow: 'auto'
                                }}>
                                Qui è dove verranno visualizzate le schermate (da aggiugere).
                            </Paper>
                        </Grid>
                    </Grid>
                </BrowserView>

                <MobileView>
                    <Grid container spacing={0} disableEqualOverflow>
                        <Grid xs={12}>
                            <AppBarMobile theme={theme} whenClicked={openDrawer} />
                        </Grid>

                        <Drawer sx={{'& .MuiDrawer-paper': { width: '80vw' } }} open={isDrawerOpen} onClose={closeDrawer}>
                            <DrawerItems selected={selectedDrawerElement} select={setSelectedDrawerElement} />
                        </Drawer>

                        <Grid xs={12}>
                            <Paper elevation={2} sx={{ height: 'calc(100vh - 64px)', p: 2, borderRadius: 2 }}>
                                Qui è dove verranno visualizzate le schermate (da aggiugere).
                            </Paper>
                        </Grid>
                    </Grid>
                </MobileView>
            </NoSSR>
        </ThemeProvider>
    )
}
