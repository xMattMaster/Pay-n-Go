"use client";
import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
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
import { useUserData } from '@/app/components/contextProvieder';
import DashboardInitialize from '@/app/dashboard/components/initialize';
import NoSSR from '@/app/components/noSSR';
import DrawerItems from '@/app/dashboard/components/drawer';
import Overview from '@/app/dashboard/panels/overview';
import Vehicles from '@/app/dashboard/panels/vehicles';
import VehiclesModify from '@/app/dashboard/panels/vehicles-modify';
import Trips from '@/app/dashboard/panels/trips';
import Payments from '@/app/dashboard/panels/payments';
import PaymentsModify from '@/app/dashboard/panels/payments-modify';
import Account from '@/app/dashboard/panels/account';
import AccountModify from '@/app/dashboard/panels/account-modify';


export default function Dashboard() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [selectedDrawerElement, setSelectedDrawerElement] = React.useState("panoramica");
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = getDesignTokens(prefersDarkMode ? 'dark' : 'light');
    const UserData = useUserData();
    let dashboardDefault = {
        accountResponse: "",
        vehiclesResponse: {
            vehicles: "",
            usableDevices: ""
        },
        tripsResponse: "",
        paymentsResponse: ""
    }
    const [dashboard, setDashboard] = React.useState(dashboardDefault);

    React.useEffect(() => {
        if (!UserData.userId) window.location.replace("/sign-in");
    });

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };
    const pageRefresh = () => {
        window.location.reload();
    }
    const gotoVehiclesModify = () => {
        setSelectedDrawerElement("automobili-modify");
    }
    const gotoVehicles = () => {
        setSelectedDrawerElement("automobili");
    }
    const gotoPaymentsModify = () => {
        setSelectedDrawerElement("pagamenti-modify");
    }
    const gotoPayments = () => {
        setSelectedDrawerElement("pagamenti");
    }
    const gotoAccountModify = () => {
        setSelectedDrawerElement("account-modify");
    }
    const gotoAccount = () => {
        setSelectedDrawerElement("account");
    }

    /**
     * TODO: Una serie di query SQL (idealmente, una per sezione) che restituisca degli oggetti da passare alle
     * singole componenti dei pannelli.
     * Esempio: La query alla tabella utenti dovrà restituire un oggetto del tipo:
     *  {
     *      Nome,
     *      Cognome,
     *      DataNascita,
     *      CodiceFiscale,
     *      Indirizzo
     *  }
     */

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <NoSSR>
                <DashboardInitialize userId={UserData.userId} modifyDashboard={setDashboard} setIsLoading={setIsLoading} />
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
                            {isLoading ?

                                <LoadingScreen />

                                :

                                <Paper elevation={2}
                                    sx={{
                                        height: 'calc(100vh - 64px)',
                                        p: 2, borderRadius: 2,
                                        overflow: 'auto'
                                    }}>
                                    {(selectedDrawerElement == "panoramica") ?
                                        <Overview
                                            value={dashboard.accountResponse} 
                                        />
                                        : null}

                                    {(selectedDrawerElement == "automobili") ?
                                        <Vehicles
                                            value={dashboard.vehiclesResponse.vehicles}
                                            changePanel={gotoVehiclesModify}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "automobili-modify") ?
                                        <VehiclesModify
                                            value={dashboard.vehiclesResponse.usableDevices}
                                            cancel={gotoVehicles}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "tragitti") ?
                                        <Trips
                                            value={dashboard.tripsResponse}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "pagamenti") ?
                                        <Payments
                                            value={dashboard.paymentsResponse}
                                            changePanel={gotoPaymentsModify}
                                        />
                                        : null}
                                    
                                    {(selectedDrawerElement == "pagamenti-modify") ?
                                        <PaymentsModify
                                            value={dashboard.paymentsResponse}
                                            cancel={gotoPayments}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "account") ?
                                        <Account
                                            value={dashboard.accountResponse}
                                            changePanel={gotoAccountModify}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "account-modify") ?
                                        <AccountModify
                                            value={dashboard.accountResponse}
                                            cancel={gotoAccount}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                </Paper>

                            }
                        </Grid>
                    </Grid>
                </BrowserView>

                <MobileView>
                    <Grid container spacing={0} disableEqualOverflow>
                        <Grid xs={12}>
                            <AppBarMobile theme={theme} whenClicked={openDrawer} />
                        </Grid>

                        <Drawer onClick={closeDrawer} sx={{ '& .MuiDrawer-paper': { width: '80vw' } }} open={isDrawerOpen} onClose={closeDrawer}>
                            <DrawerItems selected={selectedDrawerElement} select={setSelectedDrawerElement} />
                        </Drawer>

                        <Grid xs={12}>
                            {isLoading ?

                                <LoadingScreen />

                                :

                                <Paper elevation={2}
                                    sx={{
                                        height: 'calc(100vh - 64px)',
                                        p: 2, borderRadius: 2,
                                        overflow: 'auto'
                                    }}>
                                    {(selectedDrawerElement == "panoramica") ?
                                        <Overview
                                            value={dashboard.accountResponse} 
                                        />
                                        : null}

                                    {(selectedDrawerElement == "automobili") ?
                                        <Vehicles
                                            value={dashboard.vehiclesResponse.vehicles}
                                            changePanel={gotoVehiclesModify}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "automobili-modify") ?
                                        <VehiclesModify
                                            value={dashboard.vehiclesResponse.usableDevices}
                                            cancel={gotoVehicles}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "tragitti") ?
                                        <Trips
                                            value={dashboard.tripsResponse}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "pagamenti") ?
                                        <Payments
                                            value={dashboard.paymentsResponse}
                                            changePanel={gotoPaymentsModify}
                                        />
                                        : null}
                                    
                                    {(selectedDrawerElement == "pagamenti-modify") ?
                                        <PaymentsModify
                                            value={dashboard.paymentsResponse}
                                            cancel={gotoPayments}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "account") ?
                                        <Account
                                            value={dashboard.accountResponse}
                                            changePanel={gotoAccountModify}
                                        />
                                        : null}

                                    {(selectedDrawerElement == "account-modify") ?
                                        <AccountModify
                                            value={dashboard.accountResponse}
                                            cancel={gotoAccount}
                                            setIsLoading={setIsLoading}
                                            refresh={pageRefresh}
                                        />
                                        : null}

                                </Paper>

                            }
                        </Grid>
                    </Grid>
                </MobileView>
            </NoSSR>
        </ThemeProvider>
    )
}

function LoadingScreen() {
    return (
        <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Stack direction="column" spacing={2}>
                <img src="/logo_name_dark.svg" />
                <CircularProgress color="inherit" sx={{ alignSelf: "center" }} />
            </Stack>
        </Backdrop>
    )
}