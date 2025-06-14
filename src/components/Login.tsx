import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login: loginCtx, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { user, token } = await login(email, password);
      loginCtx(user, token);
      navigate('/');
    } catch (err) {
      setError('Email o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Login kit-inicio
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-slate-400 left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              placeholder="correo@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              required
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute w-5 h-5 text-slate-400 left-3 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-10 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 dark:bg-slate-700 dark:text-white dark:border-slate-600"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-slate-500 right-3 top-1/2 -translate-y-1/2 hover:text-slate-700 dark:hover:text-slate-300"
              aria-label="Mostrar u ocultar contraseña"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                disabled={isLoading}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                Recordarme
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <p>
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Regístrate aquí
                </Link>
            </p>
        </div>

      </div>
    </div>
  );
}