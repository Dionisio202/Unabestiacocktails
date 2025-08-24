import { Search, Download } from 'lucide-react';
export default function ControlsBar({ searchTerm, setSearchTerm, paymentFilter, setPaymentFilter, onExport }) {
return (
<div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 mb-6">
<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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
<select
value={paymentFilter}
onChange={(e) => setPaymentFilter(e.target.value)}
className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50"
>
<option value="all">Todos</option>
<option value="paid">Pagados</option>
<option value="unpaid">No pagados</option>
</select>


<button
onClick={onExport}
className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
>
<Download className="w-5 h-5" />
Exportar
</button>
</div>
</div>
</div>
);
}