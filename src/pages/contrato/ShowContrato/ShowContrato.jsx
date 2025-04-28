import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';


export function ShowContrato() {

    return(
        <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: 2,
        }}
        >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Contrato de Prestación de Servicios
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Ver</Button>
                    <Button size="small">Modificar</Button>
                </CardActions>
            </Card>
        </Box>
  
    )
}