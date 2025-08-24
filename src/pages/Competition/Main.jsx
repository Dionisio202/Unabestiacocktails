import { useState } from 'react';
import {
  Search,
  Trash2,
  Edit,
  Mail,
  Users,
  Phone,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Download,
  UserPlus,
  AlertCircle,
  CheckCircle,
  DollarSign,
} from 'lucide-react';

// Datos de ejemplo (en producción vendrán de Supabase)
const initialData = [
  {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+593 99 123 4567',
    registrationDate: '2024-01-15T10:30:00Z',
    paymentStatus: 'paid',
    paymentDate: '2024-01-20T12:00:00Z',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+593 98 765 4321',
    registrationDate: '2024-01-14T14:45:00Z',
    paymentStatus: 'unpaid',
    paymentDate: null,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+593 97 456 7890',
    registrationDate: '2024-01-13T09:15:00Z',
    paymentStatus: 'paid',
    paymentDate: '2024-01-18T18:30:00Z',
  },
  {
    id: 4,
    name: 'Luis Fernández',
    email: 'luis.fernandez@email.com',
    phone: '+593 96 789 0123',
    registrationDate: '2024-01-12T16:20:00Z',
    paymentStatus: 'unpaid',
    paymentDate: null,
  },
  {
    id: 5,
    name: 'Patricia Silva',
    email: 'patricia.silva@email.com',
    phone: '+593 95 234 5678',
    registrationDate: '2024-01-11T11:30:00Z',
    paymentStatus: 'paid',
    paymentDate: '2024-01-21T10:10:00Z',
  },
];

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [notification, setNotification] = useState(null);

  // ---- Helpers de fecha ----
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Para <input type="datetime-local">
  const toInputDateTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const fromInputDateTime = (value) => {
    // value viene como "YYYY-MM-DDTHH:mm" en hora local
    if (!value) return null;
    const local = new Date(value);
    return local.toISOString();
  };

  // ---- Filtros ----
  const filteredData = subscribers.filter((u) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(searchTerm);
    const matchesStatus = paymentFilter === 'all' || u.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus;
  });

  // ---- Paginación ----
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // ---- Notificación ----
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ---- Toggle pago (setea/borra fecha de pago) ----
  const togglePayment = (userId) => {
    setSubscribers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              paymentStatus: u.paymentStatus === 'paid' ? 'unpaid' : 'paid',
              paymentDate: u.paymentStatus === 'paid' ? null : new Date().toISOString(),
            }
          : u
      )
    );
    showNotification('Estado de pago actualizado');
  };

  // ---- Eliminar ----
  const handleDelete = (userId) => {
    setSubscribers((prev) => prev.filter((u) => u.id !== userId));
    setShowDeleteModal(null);
    showNotification('Participante eliminado');
  };

  // ---- Editar ----
  const handleEdit = (user) => setEditingUser({ ...user });
  const saveEdit = () => {
    setSubscribers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
    showNotification('Participante actualizado');
  };

  // ---- Email ----
  const sendEmail = (user) => {
    const subject = encodeURIComponent('UCB Masters of Cocktail 2025');
    const body = encodeURIComponent(
      `Hola ${user.name},\n\n` +
        (user.paymentStatus === 'unpaid'
          ? 'Vimos que tu pago aún está pendiente. Puedes completarlo para asegurar tu cupo.\n\n'
          : '¡Gracias por tu pago! Tu inscripción está confirmada.\n\n') +
        'Saludos,\nEquipo UCB'
    );
    window.open(`mailto:${user.email}?subject=${subject}&body=${body}`, '_blank');
    showNotification(`Email preparado para ${user.name}`);
  };

  // ---- Export CSV (incluye fecha de pago) ----
  const exportData = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Teléfono', 'Fecha de Registro', 'Estado de Pago', 'Fecha de Pago'],
      ...filteredData.map((u) => [
        u.name,
        u.email,
        u.phone,
        formatDate(u.registrationDate),
        u.paymentStatus === 'paid' ? 'Pagado' : 'No pagado',
        u.paymentDate ? formatDate(u.paymentDate) : '',
      ]),
    ]
      .map((row) =>
        row
          .map((cell) => {
            const c = String(cell ?? '');
            // Escapar comas/dobles comillas para CSV
            return /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inscripciones.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification('Datos exportados');
  };

  const paidCount = subscribers.filter((u) => u.paymentStatus === 'paid').length;
  const unpaidCount = subscribers.filter((u) => u.paymentStatus === 'unpaid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Notificación */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-2">
            Panel Administrativo
          </h1>
          <p className="text-gray-400">Gestión de inscripciones - UCB Masters of Cocktail 2025</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Inscritos</p>
                <p className="text-2xl font-bold text-white">{subscribers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pagados</p>
                <p className="text-2xl font-bold text-white">{paidCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">No pagados</p>
                <p className="text-2xl font-bold text-white">{unpaidCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Buscar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
              />
            </div>

            <div className="flex gap-3">
              {/* Filtro pago */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
              >
                <option value="all">Todos</option>
                <option value="paid">Pagados</option>
                <option value="unpaid">No pagados</option>
              </select>

              {/* Exportar */}
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
              >
                <Download className="w-5 h-5" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left p-4 text-gray-300 font-semibold">Nombre</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Email</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Teléfono</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Fecha Registro</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Estado de pago</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Fecha de pago</th>
                  <th className="text-center p-4 text-gray-300 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200"
                    >
                      <td className="p-4 text-white font-medium">{u.name}</td>
                      <td className="p-4 text-gray-300">{u.email}</td>
                      <td className="p-4 text-gray-300">{u.phone}</td>
                      <td className="p-4 text-gray-300">{formatDate(u.registrationDate)}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            u.paymentStatus === 'paid'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}
                        >
                          {u.paymentStatus === 'paid' ? 'Pagado' : 'No pagado'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {u.paymentDate ? formatDate(u.paymentDate) : '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => togglePayment(u.id)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              u.paymentStatus === 'paid'
                                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                                : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                            }`}
                            title={u.paymentStatus === 'paid' ? 'Marcar como No pagado' : 'Marcar como Pagado'}
                          >
                            {u.paymentStatus === 'paid' ? (
                              <X className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            onClick={() => sendEmail(u)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors duration-200"
                            title="Enviar Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleEdit(u)}
                            className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors duration-200"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setShowDeleteModal(u.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-400">
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="p-4 border-top border-gray-700/50 flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-700/50 disabled:bg-gray-800/50 text-white disabled:text-gray-500 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="flex items-center px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-700/50 disabled:bg-gray-800/50 text-white disabled:text-gray-500 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Editar */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-6 w-full max-w-md border border-amber-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Editar participante</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado de pago</label>
                <select
                  value={editingUser.paymentStatus}
                  onChange={(e) => {
                    const nextStatus = e.target.value;
                    setEditingUser((prev) => ({
                      ...prev,
                      paymentStatus: nextStatus,
                      // Si pasa a pagado y no hay fecha, ponemos ahora; si pasa a no pagado, limpiamos fecha
                      paymentDate:
                        nextStatus === 'paid'
                          ? prev.paymentDate || new Date().toISOString()
                          : null,
                    }));
                  }}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option value="paid">Pagado</option>
                  <option value="unpaid">No pagado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fecha de pago</label>
                <input
                  type="datetime-local"
                  value={toInputDateTime(editingUser.paymentDate)}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      paymentDate: e.target.value ? fromInputDateTime(e.target.value) : null,
                      paymentStatus: e.target.value ? 'paid' : editingUser.paymentStatus, // Si pone fecha, forzamos a pagado
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Si defines una fecha, el estado se marcará como <span className="text-green-400">Pagado</span>.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-6 w-full max-w-md border border-red-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar eliminación</h3>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar este participante? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
