
export const useContrato = () => {
    const [contratos, setContratos] = useState();
    const [loading, setLoading] = useState(false);

    const addContrato = async (formData, onSuccess, onError) => {
        const rq = {
            CobradorId: formData.cobradorId,
            TitularId: formData.titularId,

            NombreCoTitular: formData.nombreCoTitular,
            DniCoTitular: formData.dniCoTitular,
            DireccionCoTitular: formData.direccionCoTitular,
            LocalidadCoTitular: formData.localidadCoTitular,
            ProvinciaCoTitular: formData.provinciaCoTitular,
            TelefonoCoTitular: formData.telefonoCoTitular,
            TelefonoCoTitular2: formData.telefonoCoTitular2,
            EmailCoTitular: formData.emailCoTitular,
            RedSocialCoTitular: formData.redSocialCoTitular,

            NombreSegundoTitular: formData.nombreSegundoTitular,
            DniSegundoTitular: formData.dniSegundoTitular,
            DireccionSegundoTitular: formData.direccionSegundoTitular,
            LocalidadSegundoTitular: formData.localidadSegundoTitular,
            ProvinciaSegundoTitular: formData.provinciaSegundoTitular,
            TelefonoSegundoTitular: formData.telefonoSegundoTitular,
            TelefonoSegundoTitular2: formData.telefonoSegundoTitular2,
            EmailSegundoTitular: formData.emailSegundoTitular,
            RedSocialSegundoTitular: formData.redSocialSegundoTitular,

            LugarPago: formData.lugarPago,
            DireccionPago: formData.direccionPago,
            LocalidadPago: formData.localidadPago,
            ProvinciaPago: formData.provinciaPago,
            Tarjeta: formData.tarjeta,
            FechaContrato: formData.fechaContrato,
            CantidadCuotas: formData.cantidadCuotas,
        };
    }
    return { contratos, loading, addContrato };

}