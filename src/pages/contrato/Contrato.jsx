import { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Typography,
} from '@mui/material';
import { ShowContrato } from './ShowContrato/ShowContrato';
import NavHeader from '@components/NavHeader/NavHeader.jsx';
import AddContrato from './AddContrato/AddContrato';

export default function Contrato() {
    const [value, setValue] = useState(0);

    return (
        <>
            <NavHeader text="Contratos" />
            <Box sx={{ marginY: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 5 }}>
                    <BottomNavigation
                        sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 10 }}
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}>
                            <BottomNavigationAction label="Consultar Contratos" icon={<AssignmentIcon />} sx={{'& .MuiBottomNavigationAction-label': { width: '150px' }}}/>
                            <BottomNavigationAction label="Crear Contrato" icon={<NoteAddIcon />} />
                    </BottomNavigation>
                </Box>
                <Box sx={{ marginY: 5 }}>
                    {value === 0 && <ShowContrato />}
                    {value === 1 && <AddContrato />}
                </Box>
            </Box>
        </>
    );
}