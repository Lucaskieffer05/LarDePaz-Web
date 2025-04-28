import React, { useState } from 'react';
import NavHeader from '@components/NavHeader/NavHeader.jsx';
import { 
  Grid,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useClientes } from '@hooks/useClientes';


export default function AddCliente() {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    direccion: '',
    localidad: '',
    provincia: '',
    telefono1: '',
    telefono2: '',
    email: '',
    redSocial: '',
  });

  const navigate = useNavigate();

  const { addCliente } = useClientes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    addCliente(formData, 
      () => {navigate('/clientes')},
      () => {}
    );
  };

  return (
    <div>
      <NavHeader text="Nuevo Cliente" />
      <div>
        <Grid container spacing={0} rowSpacing={3} sx={{ marginTop: '40px' }}>
          <Grid size={12}>
            <TextField
              label="Nombre y Apellido"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Localidad"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Provincia"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Primer Teléfono"
              name="telefono1"
              value={formData.telefono1}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Segundo Teléfono"
              name="telefono2"
              value={formData.telefono2}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Red social"
              name="redSocial"
              value={formData.redSocial}
              onChange={handleChange}
              variant="outlined"
              sx={{ width: '400px' }}
            />
          </Grid>
          <Grid size={12} sx={{ my: '40px' }}>
            <Button
              variant="contained"
              sx={{ width: '400px', marginTop: '20px' }}
              onClick={handleSubmit}
            >
              <Typography variant="button" sx={{ fontSize: '16px' }}>
                Guardar
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}