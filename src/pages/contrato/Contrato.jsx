import { useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
} from '@mui/material';

export function Contrato() {
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ marginY: 5 }}>
            <Box >
                <BottomNavigation
                    sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 10 }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}>
                        <BottomNavigationAction label="Consultar Contratos" icon={<AssignmentIcon />} />
                        <BottomNavigationAction label="Crear Contrato" icon={<NoteAddIcon />} />
                </BottomNavigation>
            </Box>
            <Box sx={{ marginY: 5 }}>
                {value === 0 && <h1>Consultar Contratos</h1>}
                {value === 1 && <h1>Crear Contrato</h1>}
            </Box>
        </Box>
    );
}