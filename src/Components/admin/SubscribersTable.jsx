import { Mail, Edit, Trash2, X, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/dates';

function Pagination({ currentPage, totalPages, onPrev, onNext, startIndex, itemsPerPage, totalItems }) {
  if (totalPages <= 1) return null;
  return (
    <div className="p-4 border-top border-gray-700/50 flex items-center justify-between">
      <p className="text-gray-400 text-sm">
        Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} resultados
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="p-2 bg-gray-700/50 disabled:bg-gray-800/50 text-white disabled:text-gray-500 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="flex items-center px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-700/50 disabled:bg-gray-800/50 text-white disabled:text-gray-500 rounded-lg transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function SubscribersTable({
  data, // currentData (paginado)
  onTogglePayment,
  onSendEmail,
  onEdit,
  onDeleteAsk,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  startIndex,
  itemsPerPage,
  totalItems,
}) {
  return (
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
            {data.length > 0 ? (
              data.map((u) => (
                <tr key={u.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-200">
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
                  <td className="p-4 text-gray-300">{u.paymentDate ? formatDate(u.paymentDate) : '-'}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onTogglePayment(u.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          u.paymentStatus === 'paid'
                            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                            : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                        }`}
                        title={u.paymentStatus === 'paid' ? 'Marcar como No pagado' : 'Marcar como Pagado'}
                      >
                        {u.paymentStatus === 'paid' ? <X className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onSendEmail(u)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors duration-200"
                        title="Enviar Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEdit(u)}
                        className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors duration-200"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteAsk(u.id)}
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
                <td colSpan="7" className="p-8 text-center text-gray-400">No se encontraron resultados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={onPrevPage}
        onNext={onNextPage}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
}
