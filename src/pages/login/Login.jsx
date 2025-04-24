import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '@services/LocalStorage';
import API  from '@services/API';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import Toast from "@components/Toast/Toast";
import { ToastContainer } from 'react-toastify';


const providers = [{ id: 'credentials', name: 'Email and Password' }];


const handleLogin = (data) => {
    LocalStorage.setToken(data.token);
    LocalStorage.setUserId(data.user.id);
    LocalStorage.setUserRole(data.user.role);
    LocalStorage.setUserName(data.user.fullName);
    LocalStorage.setUserEmail(data.user.email);
    LocalStorage.setSessionExpiration(data.sessionExpiration);
}


export default function Login() {
    const navigate = useNavigate();
    const theme = useTheme();

    const signIn = async (provider, formData) => {
        const Email = formData.get('email');
        const Password = formData.get('password');
        const form = { email: Email, password: Password };
        API.post('Auth/Login', form)
			.then((response) => {
				handleLogin(response.data);
				navigate('/');
			})
			.catch(() => {
				Toast.warning("Credenciales incorrectas");
			});
        
    };

    return (
        // preview-start
        <>
            <ToastContainer />
            <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
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