import { createContext, useState, useContext } from 'react';
import type { User } from '../services/auth';
import type { ReactNode } from 'react';

// 1. Define la forma de los datos del usuario y del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// 2. Crea el Contexto con un valor por defecto
// El valor por defecto es importante para el autocompletado y la seguridad de tipos
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Crea el Proveedor (Provider Component)
// Este componente envolverá tu aplicación y proveerá el estado y las funciones
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  // La lógica de login podría ser más compleja, 
  // por ejemplo, guardando el token en localStorage/sessionStorage
  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    // Guardar en almacenamiento local para persistir la sesión
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Limpiar el almacenamiento local al cerrar sesión
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // El valor que será accesible por todos los componentes hijos
  const value: AuthContextType = {
    isAuthenticated: !!token,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Crea un Hook personalizado para consumir el contexto fácilmente
// Esto evita tener que importar useContext y AuthContext en cada componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};