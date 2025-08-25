import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/admin';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });
      if (error) throw error;

      navigate(from, { replace: true }); // ✅ entra al dashboard protegido
    } catch (err) {
      // Mensajes amigables
      const msg = (err?.message || '').toLowerCase();
      if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
        setError('Correo o contraseña incorrectos');
      } else if (msg.includes('email not confirmed')) {
        setError('Debes confirmar tu correo antes de iniciar sesión');
      } else {
        setError('No se pudo iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email) return setError('Ingresa tu correo para recuperar la contraseña');
    try {
      setIsLoading(true);
      setError('');
      await supabase.auth.resetPasswordForEmail(formData.email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      alert('Te enviamos un enlace para restablecer la contraseña');
    } catch (e) {
      setError('No se pudo enviar el correo de recuperación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo con degradados y trama */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(40rem_40rem_at_10%_20%,#f59e0b_10%,transparent_50%),radial-gradient(35rem_35rem_at_90%_80%,#ef4444_10%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_97%,rgba(255,255,255,.06)_98%,transparent_100%)] bg-[length:100%_24px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-[0_8px_32px_rgba(251,191,36,0.3)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-2">
            Panel Administrativo
          </h1>
          <p className="text-gray-400 text-sm">UBC Masters of Cocktail 2025</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                  placeholder="admin@ucb.edu.bo"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-[0_8px_32px_rgba(251,191,36,0.3)] hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>

            {/* Footer form */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Acceso restringido</span>
              <button type="button" onClick={handleResetPassword} className="hover:text-amber-300 underline underline-offset-4">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
