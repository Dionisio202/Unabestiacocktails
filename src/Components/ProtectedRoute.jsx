import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen grid place-items-center text-white">Cargando…</div>;
  if (!user) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  if (requireAdmin && !profile?.is_admin) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
