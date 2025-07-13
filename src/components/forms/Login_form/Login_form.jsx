import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Login_form = ({ label1, label2, toggleView, setUsuarioLogeado, setUserName }) => {
  const [formData, setFormData] = React.useState({
    userName: '',
    password: ''
  });

  const [userNameError, setUserNameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });

      const res = await axios.get(`${API_URL}/users/me`, {
        withCredentials: true,
      });

      setUsuarioLogeado(true);
      setUserName(res.data.userName);
      setUserNameError('');
      setPasswordError('');
      setFormData({ userName: '', password: '' });
      navigate('/user');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error desconocido';
      console.error(errorMsg);

      // Limpiar ambos primero
      setUserNameError('');
      setPasswordError('');

      // Asignar solo el error correspondiente
      if (errorMsg === 'incorrect password') {
        setPasswordError('Contraseña incorrecta');
      } else if (errorMsg === 'User not found') {
        setUserNameError('Usuario no registrado');
      } else {
        setUserNameError(errorMsg); // o global si querés
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      className="gap-10 flex flex-col items-center justify-between w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-900 dark:text-white animate-fadeIn"
    >
      <p className="text-2xl font-bold text-center mb-4">Login Form</p>

      <div className="flex flex-col items-center justify-center w-full gap-4">
        <TextField
          name="userName"
          label={label1}
          value={formData.userName}
          onChange={(e) => {
            setFormData({ ...formData, userName: e.target.value });
            if (userNameError) setUserNameError('');
          }}
          error={Boolean(userNameError)}
          helperText={userNameError}
          variant="outlined"
          size="small"
          fullWidth
          autoFocus={Boolean(userNameError)}
          sx={{
            input: { color: 'white', backgroundColor: 'transparent' },
            label: { color: 'gray' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#1e293b' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
              marginLeft: '0',
            },
          }}
        />

        <TextField
          name="password"
          type="password"
          label={label2}
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (passwordError) setPasswordError('');
          }}
          error={Boolean(passwordError)}
          helperText={passwordError}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            input: { color: 'white', backgroundColor: 'transparent' },
            label: { color: 'gray' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#1e293b' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
              marginLeft: '0',
            },
          }}
        />
      </div>

      <div className="flex items-center justify-around w-full mt-6 gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 rounded-xl w-1/2 font-semibold ring-2 ring-indigo-300 transition-all ${
            loading
              ? 'bg-indigo-300 cursor-not-allowed text-white'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Entrando...' : 'Log in'}
        </button>
        <button
          type="button"
          className="border border-slate-500 text-slate-700 py-2 px-4 rounded-xl hover:bg-slate-100 transition-all w-1/2 font-semibold"
          onClick={toggleView}
        >
          Register
        </button>
      </div>
    </Box>
  );
};

export default Login_form;
