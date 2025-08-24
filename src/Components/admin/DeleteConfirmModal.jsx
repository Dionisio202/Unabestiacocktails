export default function DeleteConfirmModal({ showId, onConfirm, onCancel }) {
  if (!showId) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-6 w-full max-w-md border border-red-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Confirmar eliminación</h3>
        <p className="text-gray-300 mb-6">
          ¿Estás seguro de que deseas eliminar este participante? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(showId)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Eliminar
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
