import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormUser from './components/forms/FormsUser'
import Short_url_tool from './components/short_url_tool/Short_url_tool';
import User_Page from './components/user_urls/User_page';
import { useEffect, useState, useRef } from 'react';
import Layout from './components/Layout';
import axios from 'axios';

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [userName, setUserName] = useState('');
  const hasFetched = useRef(false); // evita múltiples requests

  const API_URL = import.meta.env.VITE_API_URL 

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    axios.get(`${API_URL}/users/me`, {
      withCredentials: true,
    })
    .then((res) => {
      setUsuarioLogeado(true);
      setUserName(res.data.userName);
    })
    .catch((err) => {
      console.error('No autenticado:', err.response?.data?.error || err.message);
      setUsuarioLogeado(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout usuarioLogeado={usuarioLogeado} />}>
          <Route
            index
            element={
              <FormUser
                setUsuarioLogeado={setUsuarioLogeado}
                setUserName={setUserName}
                usuarioLogeado={usuarioLogeado}
              />
            }
          />
          <Route path="tool" element={<Short_url_tool usuarioLogeado={usuarioLogeado} userName={userName}/>} />
          <Route path="user" element={<User_Page userName={userName} usuarioLogeado={usuarioLogeado} />} />
          <Route path="*" element={<div className="text-center text-red-500">404 - Página no encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
