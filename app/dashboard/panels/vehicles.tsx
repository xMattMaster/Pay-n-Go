import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, gridClasses, itIT } from '@mui/x-data-grid';

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
    const [selectedVehicle, setSelectedVehicle] = React.useState("");

    const elabVehiclesDelete = (setIsLoading: any, refresh: any) => () => {
        if (selectedVehicle != "")
        {
            setIsLoading(true);
            setInterval(() => { refresh(); }, 3000);
        }
    }

    return (
        <Box sx={{ height: '100%' }} display='flex' flexDirection='column'>
            <Box flexGrow={1}>
                <DataGrid localeText={itIT.components.MuiDataGrid.defaultProps.localeText}
                    autoPageSize
                    rows={props.value}
                    columns={columns}
                    getRowId={(row) => row.Targa}
                    sx={{
                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                            outline: 'none',
                        },
                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                        {
                            outline: 'none',
                        },
                    }}
                    onRowSelectionModelChange={(vehicle) => {
                        let selectedTarga = vehicle.pop()?.toString();
                        if (selectedTarga != null)
                            setSelectedVehicle(selectedTarga);
                        else setSelectedVehicle("");
                        console.log(selectedTarga);
                    }}
                />
            </Box>
            <Box>
                <BrowserView>
                    <Button sx={{ my: 2, marginRight: 2 }} variant='outlined' onClick={props.changePanel}>Aggiungi automobile</Button>
                    <Button sx={{ my: 2 }} variant='outlined' onClick={elabVehiclesDelete(props.setIsLoading, props.refresh)}>Elimina automobile</Button>
                </BrowserView>

                <MobileView>
                    <Button fullWidth sx={{ marginTop: 2 }} variant='outlined' onClick={props.changePanel}>Aggiungi automobile</Button>
                    <Button fullWidth sx={{ my: 2 }} variant='outlined' onClick={elabVehiclesDelete(props.setIsLoading, props.refresh)}>Elimina automobile</Button>
                </MobileView>
            </Box>
        </Box>
    );
}

export default Vehicles;