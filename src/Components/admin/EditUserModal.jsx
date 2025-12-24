import { Save, X } from 'lucide-react';
import { toInputDateTime, fromInputDateTime } from '../../utils/dates';

export default function EditUserModal({ editingUser, setEditingUser, onSave }) {
  if (!editingUser) return null;
  return (
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
  <label className="block text-sm font-medium text-gray-300 mb-2">Ciudad</label>
  <input
    type="text"
    value={editingUser.city ?? ''}
    onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
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
                  paymentDate: nextStatus === 'paid' ? prev.paymentDate || new Date().toISOString() : null,
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
                  paymentStatus: e.target.value ? 'paid' : editingUser.paymentStatus,
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
            onClick={onSave}
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
  );
}
