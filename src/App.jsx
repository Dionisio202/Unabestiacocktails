import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CocktailCompetition from './pages/CocktailCompetition';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/Competition/Main';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<CocktailCompetition />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protegida: requiere estar logeado */}
          <Route element={<ProtectedRoute requireAdmin={false} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* opcional */}
          <Route path="/unauthorized" element={<div className="p-8 text-white">No autorizado</div>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
