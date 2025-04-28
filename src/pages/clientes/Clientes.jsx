import NavHeader from '@components/NavHeader/NavHeader.jsx';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import TableClientes from '@components/TableClientes/TableClientes';
import React, { useEffect } from 'react';
import { useClientes } from '@hooks/useClientes';
import { useNavigate } from 'react-router';
import {
  Button,
} from '@mui/material';


export default function Clientes() {

  const { clientes, fetchClientes } = useClientes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/clientes/editar/${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminar cliente con ID: ${id}`);
  };

  return (
    <div>
      <NavHeader text="Clientes" />

      <Button
        component={Link} to="/clientes/nuevo-cliente" variant="contained" startIcon={<AddIcon />}> Clientes 
      </Button>

      <TableClientes clientes={clientes} handleEdit={handleEdit} handleDelete={handleDelete} />

    </div>
  );
}