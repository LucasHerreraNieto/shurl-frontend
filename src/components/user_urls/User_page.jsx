import { useEffect, useState } from "react";
import User_urls from "./User_urls";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const User_Page = ({ userName, usuarioLogeado }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (!userName) return;

    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userName}/urls`, {
          withCredentials: true,
        });
        setUrls(response.data);
      } catch (error) {
        console.error("Error al obtener las URLs:", error);
      }
    };

    fetchUrls();
  }, [userName]);

  const deleteUrl = async (index, shortUrl) => {
    try {
      await axios.delete(`${API_URL}/urls/${shortUrl}`, {
        withCredentials: true,
      });
      alert("URL eliminada correctamente");

      // Actualiza el estado sin mutar directamente
      setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error al eliminar la URL:", error);
      alert("Hubo un problema al eliminar la URL.");
    }
  };

  if (!usuarioLogeado) {
    return <Navigate to="/" replace />;
  }

  return <User_urls userName={userName} urls={urls} deleteUrl={deleteUrl} />;
};

export default User_Page;
