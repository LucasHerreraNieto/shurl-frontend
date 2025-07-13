import { Link, Outlet } from 'react-router-dom';
import { Link2, User } from 'lucide-react';


const Layout = ({ usuarioLogeado }) => {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      {/* Navbar */}
      {usuarioLogeado && (
        <nav className="bg-gray-950 text-white px-8 py-4 shadow-md flex items-center justify-between">
          <div className="text-xl font-bold tracking-wide">🔗 ShortURL App</div>
          <div className="flex gap-6">
            <Link to="/tool" className="flex items-center gap-1 hover:text-violet-400">
              <Link2 size={18} /> Acortador
            </Link>
            <Link
              to="/user"
              className="text-gray-300 hover:text-violet-400 transition-colors duration-200"
            >
              Mi Perfil
            </Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-grow w-full flex items-center justify-center px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
