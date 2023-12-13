"use client"
import * as React from 'react';
import Cookies from 'universal-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { Dashboard, Logout } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useUserData } from '@/app/components/contextProvieder';
import NoSSR from '@/app/components/noSSR';


const cookies = new Cookies(null, { path: "/", sameSite: "strict" });

export default function AppBar(theme: Theme) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const UserData = useUserData();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const profileMenuOpen = Boolean(anchorEl);
    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleDashboard = () => {
        window.location.replace("/dashboard");
    }
    const handleLogout = () => {
        cookies.remove("user_id");
        cookies.remove("nome");
        cookies.remove("cognome");
        window.location.replace("/sign-in");
    }
    var appbarLogo = "/logo_name.svg";
    if (prefersDarkMode) appbarLogo = "/logo_name_dark.svg";
    let loginButtonText = "Accedi";
    if (UserData.userId) loginButtonText = "Benvenuto, " + UserData.nome + " " + UserData.cognome + "!";

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NoSSR>
                <Toolbar component="nav" sx={{
                    backgroundImage: `url(${appbarLogo})`,
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                }}>
                    <Box
                        alignSelf="center"
                        sx={{ flex: 1 }} />
                    {UserData.userId ?
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleIconClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={profileMenuOpen ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={profileMenuOpen ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
                        :
                        <Button href="/sign-in" variant="outlined" size="small">
                            Accedi
                        </Button>
                    }

                    <Menu
                        anchorEl={anchorEl}
                        id="accountMenu"
                        open={profileMenuOpen}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Typography sx={{ m: 2 }}>
                            Benvenuto, {UserData.nome} {UserData.cognome}!
                        </Typography>
                        <MenuItem sx={{ p: 2}} onClick={handleDashboard}>
                            <ListItemIcon>
                                <Dashboard fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem sx={{ p: 2}} onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </NoSSR>
        </ThemeProvider>
    )
}