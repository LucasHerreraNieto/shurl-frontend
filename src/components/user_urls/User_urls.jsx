import { Link } from "react-router-dom";
import { Trash2, EllipsisVertical } from "lucide-react"; // si usás lucide o algún ícono
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL ;


const User_urls = ({ userName, urls, deleteUrl }) => {

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-fit  p-8 bg-gray-950 rounded-2xl shadow-xl flex flex-col items-center text-gray-200 mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 tracking-wide text-white">
        URLs de {userName}
      </h1>
      <p className="mb-8 text-center text-gray-400 max-w-sm">
        Gestioná tus URLs personalizadas de forma rápida y segura.
      </p>

      {urls.length === 0 ? (
        <p className="text-gray-500 italic">No hay URLs registradas.</p>
      ) : (
        <ul className="w-full space-y-4">
          {urls.map((url, index) => (
            <li
              key={index}
              className="bg-gray-800 rounded-lg p-4 flex flex-wrap items-center justify-between shadow-md hover:bg-gray-700 transition"
            >
              <a
                href={`${API_URL}/${url.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 font-semibold hover:underline break-words max-w-[75%]"
                title={`${API_URL}/${url.shortUrl}`}
              >
                localhost:3000/{url.shortUrl}
              </a>

              {/* Dropdown */}
              
              <div className="relative">
                <button
                  onClick={() => setOpenIndex(index === openIndex ? null : index)}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  <EllipsisVertical className="text-white" />
                </button>

                {openIndex === index && (
                  
                  <div className="absolute right-0 z-10 mt-2 w-80 rounded-xl shadow-2xl bg-gray-900/95 ring-1 ring-white/10 backdrop-blur-md p-4 animate-fadeIn">
                    <span className="absolute top-0 right-4 -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45 ring-1 ring-white/10"></span>

                    <p
                      className="block text-gray-300 text-sm mb-3 truncate"
                      title={url.originalUrl}
                    >
                      {url.originalUrl}
                    </p>
                    <button
                      onClick={() => {
                        deleteUrl(index, url.shortUrl);
                        setOpenIndex(null);
                      }}
                      className="flex items-center text-red-500 hover:text-red-400 transition text-sm font-medium"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Eliminar URL
                    </button>
                  </div>
                )}

              </div>
            </li>


          ))}
        </ul>
      )}

      <Link
        to="/tool"
        onClick={() => console.log("Agregar nueva URL")}
        className="mt-8 inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
      >
        + Agregar nueva URL
      </Link>
    </div>
  );
};

export default User_urls;
