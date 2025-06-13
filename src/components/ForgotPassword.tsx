import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/auth';
import { Mail, LoaderCircle, MailCheck, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError('Si existe una cuenta con este email, recibirás un correo en breve.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-slate-800">
        {sent ? (
          <div className="text-center">
            <MailCheck className="w-16 h-16 mx-auto text-green-500" />
            <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              ¡Revisa tu correo!
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Hemos enviado un enlace para restablecer tu contraseña a{' '}
              <span className="font-semibold text-slate-800 dark:text-white">{email}</span>.
            </p>
            <div className="mt-6">
                <Link
                    to="/login"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver a inicio de sesión
                </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                No te preocupes. Ingresa tu email y te enviaremos un enlace para recuperarla.
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-lg dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-slate-400 left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  placeholder="tu-correo@ejemplo.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar enlace de recuperación'
                )}
              </button>
            </form>
            <div className="text-center">
                <Link
                    to="/login"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver a inicio de sesión
                </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}