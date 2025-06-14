import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white space-y-6">
      <h1 className="text-3xl font-bold">Kit-Inicio</h1>
      <div className="space-x-4">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:hover:bg-red-700 text-white rounded shadow"
        >
          Cerrar sesión
        </button>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 text-white rounded shadow"
        >
          {darkMode ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </div>
  );
}
