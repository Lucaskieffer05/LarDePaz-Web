import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Button, Autocomplete, CircularProgress, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AddIcon from '@mui/icons-material/Add';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useClientes } from '@hooks/useClientes';
import ParcelSelector from '@components/ParcelaSelector/ParcelaSelector';

export default function AddContrato() {
    const { clientes, fetchClientes, loading } = useClientes()
    const [precioExpensa, setPrecioExpensa] = useState(0);
    const [precioCompra, setPrecioCompra] = useState(0);
    const [selectedParcels, setSelectedParcels] = useState([]);
    const [formData, setFormData] = useState({
        cobradorId: '',
        titularId: '',
        nombreCoTitular: '',
        dniCoTitular: '',
        direccionCoTitular: '',
        localidadCoTitular: '',
        provinciaCoTitular: '',
        telefonoCoTitular: '',
        telefonoCoTitular2: '',
        emailCoTitular: '',
        redSocialCoTitular: '',
        nombreSegundoTitular: '',
        dniSegundoTitular: '',
        direccionSegundoTitular: '',
        localidadSegundoTitular: '',
        provinciaSegundoTitular: '',
        telefonoSegundoTitular: '',
        telefonoSegundoTitular2: '',
        emailSegundoTitular: '',
        redSocialSegundoTitular: '',
        lugarPago: '',
        direccionPago: '',
        localidadPago: '',
        provinciaPago: '',
        tarjeta: '',
        fechaContrato: dayjs().toISOString(),
        cantidadCuotas: '',
        listParcelaId: selectedParcels.map(parcel => parcel.id), // Asignar IDs de parcelas seleccionadas
        precioTotalDeCompra: 0,
    });

    useEffect(() => {
        fetchClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pesos = (value) => {
        return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    };

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            listParcelaId: selectedParcels.map((parcel) => parcel.id),
        }));
    }, [selectedParcels]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            fechaContrato: date ? date.toISOString() : '',
        });
    };

    const handleTitularOptions = (event, value) => {
        console.log('Cliente seleccionado:', value); 
        setFormData({
            ...formData,
            titularId: value ? value.id : '', 
        });
    }

    const handleSubmit = () => {
        console.log('Datos del formulario:', formData);
        // Aquí puedes manejar el envío del formulario
    };

    const onParcelChange =  (parcels, precioExpesa, precioCompra) => {
        setSelectedParcels(parcels);
        setPrecioExpensa(precioExpesa);
        setPrecioCompra(precioCompra);
    }


    return (
        <div>
        <Grid container spacing={3}>
            {/* Campos principales */}
            <Grid size={12}>
                <Typography variant="h6">Selección de Parcelas</Typography>
                <ParcelSelector
                    selectedParcels={selectedParcels}
                    onParcelChange={onParcelChange}
                />
            </Grid>

            <Grid size={12}>
                {selectedParcels.map((parcela) => (
                    <Box key={parcela.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AddIcon sx={{ color: '#6ecc72', alignItems: 'center' }} />
                        <Typography sx={{ color: '#808080', mr: 1, textDecoration: 'underline' }}>Parcela:</Typography>
                        <Typography>{parcela.fila}-{parcela.columna}</Typography>
                        <Typography sx={{ color: '#808080', mr: 1, ml: 1, textDecoration: 'underline' }}>Precio Zona:</Typography>
                        <Typography>{pesos(parcela.zona.precioCompra)}</Typography>
                        <Typography sx={{ color: '#808080', mr: 1, ml: 1, textDecoration: 'underline' }}>Manzana:</Typography>
                        <Typography>{parcela.manzana.nombre}</Typography>
                        <Typography sx={{ color: '#808080', mr: 1, ml: 1, textDecoration: 'underline' }}>Expensa:</Typography>
                        <Typography>{pesos(parcela.manzana.precioExpensa)}</Typography>
                    </Box>
                ))}
            </Grid>

            <Typography>
                Total de compra: {' '}
                <Box component="span" sx={{ color: '#6ecc72'}}>
                    {precioCompra.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </Box>
            </Typography>
            <Typography>
                Total de expensas: {' '}
                <Box component="span" sx={{ color: '#6ecc72'}}>
                    {precioExpensa.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </Box>
            </Typography>

            <Grid size={12}>
                <Typography variant="h6">Selección del Titular</Typography>
            </Grid>
            <Grid size={{xs: 12, sm: 6, md: 4}}>
            <TextField
                label="Cobrador ID"
                name="cobradorId"
                value={formData.cobradorId}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
            <Grid size={{xs: 12, sm: 6, md: 4}} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Autocomplete
                        disablePortal
                        name="titularId"
                        onChange={handleTitularOptions}
                        options={clientes}
                        getOptionLabel={(option) => `${option.dni} ${option.nombreApellido}`} // Extraer los DNI de los clientes
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Titular"/>}
                    />
                    {loading && <CircularProgress size={24} />}
                </Box>
            
            </Grid>

            {/* Campos del CoTitular */}
            <Grid size={12}>
            <Typography variant="h6">Datos del CoTitular</Typography>
            </Grid>
            {[
            { label: 'Nombre', name: 'nombreCoTitular' },
            { label: 'DNI', name: 'dniCoTitular' },
            { label: 'Dirección', name: 'direccionCoTitular' },
            { label: 'Localidad', name: 'localidadCoTitular' },
            { label: 'Provincia', name: 'provinciaCoTitular' },
            { label: 'Teléfono', name: 'telefonoCoTitular' },
            { label: 'Teléfono 2', name: 'telefonoCoTitular2' },
            { label: 'Email', name: 'emailCoTitular' },
            { label: 'Red Social', name: 'redSocialCoTitular' },
            ].map((field, index) => (
            <Grid size={6} key={index}>
                <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            ))}

            {/* Campos del Segundo Titular */}
            <Grid size={12}>
            <Typography variant="h6">Datos del Segundo Titular</Typography>
            </Grid>
            {[
            { label: 'Nombre', name: 'nombreSegundoTitular' },
            { label: 'DNI', name: 'dniSegundoTitular' },
            { label: 'Dirección', name: 'direccionSegundoTitular' },
            { label: 'Localidad', name: 'localidadSegundoTitular' },
            { label: 'Provincia', name: 'provinciaSegundoTitular' },
            { label: 'Teléfono', name: 'telefonoSegundoTitular' },
            { label: 'Teléfono 2', name: 'telefonoSegundoTitular2' },
            { label: 'Email', name: 'emailSegundoTitular' },
            { label: 'Red Social', name: 'redSocialSegundoTitular' },
            ].map((field, index) => (
            <Grid size={6} key={index}>
                <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            ))}

            {/* Campos de Pago */}
            <Grid size={12}>
            <Typography variant="h6">Datos de Pago</Typography>
            </Grid>
            {[
            { label: 'Lugar de Pago', name: 'lugarPago' },
            { label: 'Dirección de Pago', name: 'direccionPago' },
            { label: 'Localidad de Pago', name: 'localidadPago' },
            { label: 'Provincia de Pago', name: 'provinciaPago' },
            { label: 'Tarjeta', name: 'tarjeta' },
            ].map((field, index) => (
            <Grid size={6} key={index}>
                <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                />
            </Grid>
            ))}

            {/* Otros campos */}
            <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        format='DD/MM/YYYY' // Formato de fecha
                        onChange={handleDateChange} 
                        label="Fecha del Contrato" 
                        sx={{ width: '100%' }}
                        value={dayjs(formData.fechaContrato)} // Asegúrate de importar dayjs
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid  size={3}>
            <TextField
                label="Cantidad de Cuotas"
                name="cantidadCuotas"
                type="number"
                value={formData.cantidadCuotas}
                onChange={handleChange}
                fullWidth
            />
            </Grid>

            {/* Botón de Guardar */}
            <Grid  size={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Crear Contrato
            </Button>
            </Grid>
        </Grid>
        </div>
    );
}