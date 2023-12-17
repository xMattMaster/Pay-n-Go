import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'Targa',
        headerName: 'Targa',
        flex: 0.3,
        editable: false,
    },
    {
        field: 'Modello',
        headerName: 'Modello',
        flex: 0.4,
        editable: false,
    },
    {
        field: 'Dispositivo',
        headerName: 'Dispositivo',
        type: 'number',
        flex: 0.3,
        editable: false,
    },
];

function Vehicles(props: any) {

    return (
        <Box sx={{ height: '100%' }} display='flex' flexDirection='column'>
            <Box flexGrow={1}>
                <DataGrid
                    autoPageSize
                    rows={props.value}
                    columns={columns}
                    getRowId={(row) => row.Targa}
                />
            </Box>
            <Box>
                <BrowserView>
                    <Button sx={{ my: 2 }} variant='outlined' onClick={props.changePanel}>Aggiungi automobile</Button>
                </BrowserView>

                <MobileView>
                    <Button fullWidth sx={{ my: 2 }} variant='outlined' onClick={props.changePanel}>Aggiungi automobile</Button>
                </MobileView>
            </Box>
        </Box>
    );
}

export default Vehicles;