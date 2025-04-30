import React, { useState, useEffect, useMemo } from 'react';
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Checkbox,
  Grid,
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import API from '@services/API';
import Toast from '@components/Toast/Toast';

const ParcelaSelector = ({ selectedParcels, onParcelChange }) => {
  const [manzanas, setManzanas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [parcelas, setParcelas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManzana, setSelectedManzana] = useState(null);
  const [selectedZona, setSelectedZona] = useState(null);
  const [loading, setLoading] = useState({
    manzanas: false,
    zonas: false,
    parcelas: false
  });

  // Fetch Manzanas al montar el componente
  useEffect(() => {
    const fetchManzanas = async () => {
      setLoading(prev => ({...prev, manzanas: true}));
      API.get('Manzana/GetAll')
        .then((response) => {
          setManzanas(response.data.manzanas);
        })
        .catch(() => Toast.error("Error al cargar las manzanas"))
        .finally(() => setLoading(prev => ({...prev, manzanas: false})));
    };
    fetchManzanas();
  }, []);

  // Fetch Zonas cuando se selecciona una Manzana
  useEffect(() => {
    if(selectedManzana) {
      setLoading(prev => ({...prev, zonas: true}));
      API.get(`Zona/GetByManzanaId`, { ManzanaId: selectedManzana.id } )
        .then((response) => setZonas(response.data.zonas))
        .catch(() => Toast.error("Error al cargar las zonas"))
        .finally(() => setLoading(prev => ({...prev, zonas: false})));
    }
  }, [selectedManzana]);

  // Fetch Parcelas con debounce y búsqueda
  useEffect(() => {
    if(selectedZona) {
      const delayDebounce = setTimeout(() => {
        setLoading(prev => ({...prev, parcelas: true}));
        API.get(`Parcela/GetByZonaId`, { ZonaId: selectedZona.id})
        .then((response) => setParcelas(response.data.parcelas))
        .catch(() => Toast.error("Error al cargar las parcelas"))
        .finally(() => setLoading(prev => ({...prev, parcelas: false})));
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [selectedZona, searchTerm]);

  const handleParcelToggle = (parcela) => {
    const exists = selectedParcels.find(p => p.id === parcela.id);
    const manzana = selectedManzana
    const zona = selectedZona
    const newSelection = exists
      ? selectedParcels.filter(p => p.id !== parcela.id)
      : [...selectedParcels, { id: parcela.id, fila:parcela.fila, columna: parcela.columna , manzana, zona }];
    const totalExpensa = newSelection.reduce((sum, p) => sum + p.manzana.precioExpensa, 0);
    const totalCompra = newSelection.reduce((sum, p) => sum + p.zona.precioCompra, 0);
    onParcelChange(newSelection, totalExpensa, totalCompra);
  };

  const handleParcelaFilter = (event) => {
    const value = event.target.value || ''; // Asegúrate de que value no sea undefined
    setSearchTerm(value); // Actualiza el estado con el término de búsqueda
  };

  const filteredParcelas = useMemo(() => {
    return parcelas.filter((parcela) => {
      const parcelaString = `${parcela.fila}-${parcela.columna}`.toLowerCase();
      return parcelaString.includes(searchTerm.toLowerCase());
    });
  }, [parcelas, searchTerm]);

  const Row = ({ index, style }) => {
    const parcela = filteredParcelas[index];
    return (
      <div style={style}>
        <Grid container alignItems="center">
          <Grid >
            <Checkbox
              checked={selectedParcels.some(p => p.id === parcela.id)}  
              onChange={() => handleParcelToggle(parcela)}
            />
          </Grid>
          <Grid >
            {parcela.fila}-{parcela.columna}
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      {/* Selectores de Manzana y Zona */}
      <Grid container spacing={2}>
        <Grid  size={3}>
          <Autocomplete
            options={manzanas}
            getOptionLabel={(option) => option.nombre}
            value={selectedManzana}
            onChange={(_, newValue) => {
              setSelectedManzana(newValue);
              setSelectedZona(null);
              setParcelas([]);
            }}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Seleccionar Manzana"
                />
            )}
          />
        </Grid>

        <Grid  size={6}>
          {selectedManzana && (
            <Autocomplete
              options={zonas}
              getOptionLabel={(option) => `${option.nombreDescriptivo} - ${option.precioCompra.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`} 
              value={selectedZona}
              onChange={(_, newValue) => {
                setSelectedZona(newValue);
                setParcelas([]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccionar Zona"
                />
              )}
            />
          )}
        </Grid>
      </Grid>

      {/* Búsqueda y listado de Parcelas */}
      {selectedZona && (
        <div style={{ marginTop: 16, width: '200px', }}>
            <TextField
                fullWidth
                label="Buscar parcela (Ej: 1-5)"
                value={searchTerm}
                onChange={handleParcelaFilter}           
            />
            {loading.parcelas && <CircularProgress size={50} sx={{my:"30px"}}/>}

            {filteredParcelas.length> 0 && (
                <div style={{ marginTop: 16, height: '400px', border: '1px solid #ddd' }}>
                <FixedSizeList
                    height={400}
                    width="100%"
                    itemSize={50}
                    itemCount={filteredParcelas.length}
                >
                    {Row}
                </FixedSizeList>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ParcelaSelector;