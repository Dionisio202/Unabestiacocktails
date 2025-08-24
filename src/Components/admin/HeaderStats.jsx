import { Users, CheckCircle, AlertCircle } from 'lucide-react';
export default function HeaderStats({ total, paid, unpaid }) {
return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
<div className="flex items-center gap-4">
<div className="p-3 bg-amber-500/20 rounded-xl">
<Users className="w-6 h-6 text-amber-400" />
</div>
<div>
<p className="text-gray-400 text-sm">Total Inscritos</p>
<p className="text-2xl font-bold text-white">{total}</p>
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
<p className="text-2xl font-bold text-white">{paid}</p>
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
<p className="text-2xl font-bold text-white">{unpaid}</p>
</div>
</div>
</div>
</div>
);
}