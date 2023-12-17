import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
        field: 'Dispositivo',
        headerName: 'Dispositivo',
        flex: 0.1,
        editable: false,
    },
    {
        field: 'NumTragitto',
        headerName: 'Numero Tragitto',
        flex: 0.1,
        editable: false,
    },
    {
        field: 'CasIngresso',
        headerName: 'Casello di ingresso',
        flex: 0.2,
        editable: false,
    },
    {
        field: 'DataOraIngresso',
        headerName: 'Data e ora di ingresso',
        flex: 0.2,
        editable: false,
    },
    {
        field: 'CasUscita',
        headerName: 'Casello di uscita',
        flex: 0.2,
        editable: false,
    },
    {
        field: 'DataOraUscita',
        headerName: 'Data e ora di uscita',
        flex: 0.2,
        editable: false,
    },
];

const columnsMobile: GridColDef[] = [
    {
        field: 'Dispositivo',
        headerName: 'Dispositivo',
        width: 150,
        editable: false,
    },
    {
        field: 'NumTragitto',
        headerName: 'Numero Tragitto',
        width: 150,
        editable: false,
    },
    {
        field: 'CasIngresso',
        headerName: 'Casello di ingresso',
        width: 200,
        editable: false,
    },
    {
        field: 'DataOraIngresso',
        headerName: 'Data e ora di ingresso',
        width: 200,
        editable: false,
    },
    {
        field: 'CasUscita',
        headerName: 'Casello di uscita',
        width: 200,
        editable: false,
    },
    {
        field: 'DataOraUscita',
        headerName: 'Data e ora di uscita',
        width: 200,
        editable: false,
    },
];

function Trips(props: any) {
    return (
        <Box sx={{ height: '100%' }} display='flex' flexDirection='column'>
            <BrowserView style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box flexGrow={1}>
                    <DataGrid
                        autoPageSize
                        rows={props.value}
                        columns={columns}
                        getRowId={(row) => row.Id}
                    />
                </Box>
            </BrowserView>

            <MobileView style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box flexGrow={1}>
                    <DataGrid
                        autoPageSize
                        rows={props.value}
                        columns={columnsMobile}
                        getRowId={(row) => row.Id}
                    />
                </Box>
            </MobileView>
        </Box>
    );
}

export default Trips;