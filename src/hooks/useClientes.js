import { useState } from 'react';
import API from '@services/API';
import Toast from '@components/Toast/Toast';

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClientes = async () => {
    setLoading(true);
    
    API.get('Cliente/GetAll')
        .then((response) => {
            setClientes(response.data.clientes);
        })
        .catch(() => {
            Toast.error('Error al obtener los clientes');
        })
        .finally(() => {
            setLoading(false);
        });
  };

  const addCliente = async (formData, onSuccess, onError) => {
    const rq = {
        NombreApellido: formData.nombre,
        DNI: formData.dni,
        Direccion: formData.direccion,
        Localidad: formData.localidad,
        Provincia: formData.provincia,
        Telefono1: formData.telefono1,
        Telefono2: formData.telefono2,
        Email: formData.email,
        RedSocial: formData.redSocial,
    };
    setLoading(true);
    API.post('Cliente/Create', rq)
        .then((response) => {
            Toast.success(response.message);
            onSuccess();
        })
        .catch((response) => {
            console.error(response.error);
            Toast.error(response.error?.message);
            onError();
        })
        .finally(() => {
            setLoading(false);
        });
  };

  /* const deleteCliente = async (id) => {
    try {
      await API.post(`Cliente/Delete/${id}`);
      Toast.success('Cliente eliminado correctamente');
      fetchClientes(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error(error);
      Toast.error('Error al eliminar el cliente');
    }
  }; */

  /* const updateCliente = async (id, formData) => {
    try {
      const rq = {
        NombreApellido: formData.nombre,
        DNI: formData.dni,
        Direccion: formData.direccion,
        Localidad: formData.localidad,
        Provincia: formData.provincia,
        Telefono1: formData.telefono1,
        Telefono2: formData.telefono2,
        Email: formData.email,
        RedSocial: formData.redSocial,
      };
      const response = await API.post(`Cliente/Update/${id}`, rq);
      Toast.success(response.message);
      fetchClientes(); // Actualiza la lista después de modificar
    } catch (error) {
      console.error(error);
      Toast.error('Error al actualizar el cliente');
    }
  }; */

  return {
    clientes,
    loading,
    fetchClientes,
    addCliente,
    /* deleteCliente,
    updateCliente, */
  };
};