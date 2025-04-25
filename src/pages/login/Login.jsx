import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '@services/LocalStorage';
import API  from '@services/API';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import Toast from "@components/Toast/Toast";
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '@context/AuthContext';
import { useContext } from 'react';


const providers = [{ id: 'credentials', name: 'correo y contraseña' }];


export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const signIn = async (provider, formData) => {
    try {
      const Email = formData.get('email');
      const Password = formData.get('password');
      const form = { email: Email, password: Password };
      const response = await API.post('Auth/Login', form);
      login(response.data);
      Toast.success("Bienvenido " + LocalStorage.getUserName() + "!");
      /* setTimeout(() => {}, 5000); */ // Espera 2 segundos antes de redirigir
      navigate('/');
    } catch {
      Toast.warning("Credenciales incorrectas");
    }
      
  };

  return (
      // preview-start
      <>
          <ToastContainer />
          <AppProvider theme={theme}>
          <SignInPage
              signIn={signIn}
              providers={providers}
              localeText={{
                providerSignInTitle: () => `Iniciar sesión`,
                signInTitle: 'Inicio de sesión',
                signInSubtitle: 'Ingrese su correo electrónico y contraseña para continuar',
              }}
              slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
          />
          </AppProvider>
      </>
      // preview-end
  );
}





/* function Login() {
  const [email, setEmal] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Simula la autenticación (reemplaza con una llamada a tu API)
    if (email === 'admin' && password === 'password') {
      setToken('fake-jwt-token'); // Guarda el token en el almacenamiento local
      navigate('/'); // Redirige a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Correo Electrónico"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        onChange={(e) => setEmal(e.target.value)}
        sx={{ maxWidth: 400 }}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ maxWidth: 400 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2, maxWidth: 400 }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
}

export default Login; */