import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Register_form = ({ label1, label2, label3, toggleView }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    userName: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let valid = true;
    const newErrors = { email: '', userName: '', password: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Debe ser un email válido';
      valid = false;
    }

    if (!formData.userName.trim()) {
      newErrors.userName = 'El nombre de usuario es obligatorio';
      valid = false;
    } else if (formData.userName.length < 3) {
      newErrors.userName = 'Debe tener al menos 3 caracteres';
      valid = false;
    } else if (/\s/.test(formData.userName)) {
      newErrors.userName = 'No debe contener espacios';
      valid = false;
    } else if (!/^[a-zA-Z0-9_.-]*$/.test(formData.userName)) {
      newErrors.userName = 'Solo letras, números, guiones, puntos';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
      valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.password)) {
      newErrors.password = 'Debe contener mayúscula, minúscula y número';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      console.log('Usuario registrado:', response.data);
      setFormData({ userName: '', email: '', password: '' });
      toggleView();
    } catch (error) {
      const mensaje = error.response?.data?.error || error.message;
      console.error('Error al registrar el usuario:', mensaje);
      alert('Error al registrar: ' + mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      className="gap-10 flex flex-col items-center justify-between w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-900 dark:text-white animate-fadeIn transition-all"
    >
      <p className="text-2xl font-bold text-center mb-4">Register Form</p>

      <div className="flex flex-col items-center justify-center w-full gap-4">
        <TextField
          name="email"
          type="email"
          label={label2}
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          sx={textFieldStyle}
        />

        <TextField
          name="userName"
          label={label1}
          value={formData.userName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          error={!!errors.userName}
          helperText={errors.userName}
          sx={textFieldStyle}
        />

        <TextField
          name="password"
          type="password"
          label={label3}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
          sx={textFieldStyle}
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
          {loading ? 'Registrando...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={toggleView}
          className="border border-slate-500 text-slate-700 py-2 px-4 rounded-xl hover:bg-slate-100 transition-all w-1/2 font-semibold"
        >
          Log in
        </button>
      </div>
    </Box>
  );
};

const textFieldStyle = {
  input: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  label: {
    color: 'gray',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1e293b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#f87171',
    marginLeft: '0',
  },
};

export default Register_form;
