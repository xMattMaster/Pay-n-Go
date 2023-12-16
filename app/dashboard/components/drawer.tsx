"use client"
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Done, Dock, Map, CreditCard, Person } from '@mui/icons-material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';


const menuItems: SxProps<Theme> = {
    margin: 1,
    padding: 2,
    borderRadius: 2
};

function Drawer(props: any) {
    const menuItemClickHandle = (element: string) => () => {
        props.select(element);
    }

    return (
        <Box component="div">
            <MenuItem sx={menuItems} selected={(props.selected == "panoramica")} onClick={menuItemClickHandle("panoramica")}>
                <ListItemIcon>
                    <Done />
                </ListItemIcon>
                <ListItemText>Panoramica</ListItemText>
            </MenuItem>
            <MenuItem sx={menuItems} selected={(props.selected == "dispositivi")} onClick={menuItemClickHandle("dispositivi")}>
                <ListItemIcon>
                    <Dock />
                </ListItemIcon>
                <ListItemText>Dispositivi</ListItemText>
            </MenuItem>
            <MenuItem sx={menuItems} selected={(props.selected == "tragitti")} onClick={menuItemClickHandle("tragitti")}>
                <ListItemIcon>
                    <Map />
                </ListItemIcon>
                <ListItemText>Tragitti</ListItemText>
            </MenuItem>
            <MenuItem sx={menuItems} selected={(props.selected == "pagamenti")} onClick={menuItemClickHandle("pagamenti")}>
                <ListItemIcon>
                    <CreditCard />
                </ListItemIcon>
                <ListItemText>Pagamenti</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem sx={menuItems} selected={(props.selected == "account" || props.selected == "account-modify")} onClick={menuItemClickHandle("account")}>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText>Account</ListItemText>
            </MenuItem>
        </Box>
    )
}

export default Drawer;