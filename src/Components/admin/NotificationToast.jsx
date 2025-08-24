import { CheckCircle, AlertCircle } from 'lucide-react';
export default function NotificationToast({ notification }) {
if (!notification) return null;
const isSuccess = notification.type === 'success';
return (
<div
className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
isSuccess
? 'bg-green-500/20 border border-green-500/30 text-green-400'
: 'bg-red-500/20 border border-red-500/30 text-red-400'
}`}
>
{isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
<span>{notification.message}</span>
</div>
);
}