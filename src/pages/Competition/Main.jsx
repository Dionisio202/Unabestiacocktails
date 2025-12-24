import { useEffect, useMemo, useState } from 'react';
import NotificationToast from '../../Components/admin/NotificationToast';
import HeaderStats from '../../Components/admin/HeaderStats';
import ControlsBar from '../../Components/admin/ControlsBar';
import SubscribersTable from '../../Components/admin/SubscribersTable';
import EditUserModal from '../../Components/admin/EditUserModal';
import DeleteConfirmModal from '../../Components/admin/DeleteConfirmModal';
import { formatDate } from '../../utils/dates';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Preloaded from '../../Components/Preloaded';

const MAILER_URL = import.meta.env.VITE_MAILER_URL;
const MAILER_API_KEY = import.meta.env.VITE_MAILER_API_KEY;

async function sendPaymentEmail({ name, email }) {
  if (!MAILER_URL || !MAILER_API_KEY) {
    console.warn('MAILER_URL o MAILER_API_KEY no definidos');
    return;
  }
  const contestName = 'ucb-masters-001-2026';
 const rulesUrl = "https://mailserver-y8jw.onrender.com/download/reglas";
  const res = await fetch(`${MAILER_URL}/api/mails/payment-confirmed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Debe coincidir con la validación que pusimos en server.js
      Authorization: `Bearer ${MAILER_API_KEY}`,
    },
    body: JSON.stringify({ name, email, contestName,rulesUrl }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'SEND_FAILED');
  }
}

// Cambia al slug del concurso activo en tu DB
const CONTEST_SLUG = 'ucb-masters-001-2026';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [contestId, setContestId] = useState(null);
  const [loadingContest, setLoadingContest] = useState(true);

  const [subscribers, setSubscribers] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [notification, setNotification] = useState(null);
const [loadingMail, setLoadingMail] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  // 1) Resolver contest_id por slug
  useEffect(() => {
    (async () => {
      setLoadingContest(true);
      const { data, error } = await supabase
        .from('contests')
        .select('id')
        .eq('slug', CONTEST_SLUG)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error(error);
        showNotification('No se pudo cargar el concurso', 'error');
      } else if (!data) {
        showNotification('Concurso inactivo o no existe', 'error');
      } else {
        setContestId(data.id);
      }
      setLoadingContest(false);
    })();
  }, []);

  // 2) Cargar inscripciones del concurso
  useEffect(() => {
    if (!contestId) return;
    (async () => {
      setLoadingTable(true);
      const { data, error } = await supabase
        .from('registrations')
        .select('id,name,email,phone,city,registered_at,payment_status,payment_date')
        .eq('contest_id', contestId)
        .order('registered_at', { ascending: false });

      if (error) {
        console.error(error);
        showNotification('No se pudo cargar inscripciones', 'error');
      } else {
        // Mapea a tu shape de UI
        setSubscribers(
          (data ?? []).map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            phone: r.phone ?? '',
             city: r.city ?? '',
            registrationDate: r.registered_at,
            paymentStatus: r.payment_status,
            paymentDate: r.payment_date,
          })),
        );
      }
      setLoadingTable(false);
    })();
  }, [contestId]);

  // 3) Acciones CRUD
const togglePayment = async (userId) => {
  const row = subscribers.find(s => s.id === userId);
  if (!row) return;

  const toPaid = row.paymentStatus !== 'paid';
  const accion = toPaid ? 'PONER como PAGADO' : 'PONER como NO PAGADO';
  const ok = window.confirm(`¿Seguro que deseas ${accion} a "${row.name}" (${row.email})?`);
  if (!ok) return;

  // Optimista
  setSubscribers(prev => prev.map(u => u.id === userId
    ? { ...u, paymentStatus: toPaid ? 'paid' : 'unpaid', paymentDate: toPaid ? new Date().toISOString() : null }
    : u));

  const patch = { payment_status: toPaid ? 'paid' : 'unpaid' };
  const { data, error } = await supabase
    .from('registrations')
    .update(patch)
    .eq('id', userId)
    .select('id,name,email,phone,city,registered_at,payment_status,payment_date')

    .maybeSingle();

  if (error) {
    setSubscribers(prev => prev.map(u => u.id === userId ? row : u)); // revertir
    console.error(error);
    showNotification('No se pudo actualizar el estado de pago', 'error');
    return;
  }

  // Sincroniza con trigger
  setSubscribers(prev => prev.map(u => u.id === userId
    ? { ...u, paymentStatus: data?.payment_status, paymentDate: data?.payment_date }
    : u));

  showNotification(`Estado actualizado: ${toPaid ? 'Pagado' : 'No pagado'}`);

  // 👉 Si quedó en "paid", enviamos el correo con preloader
  if (toPaid && data?.payment_status === 'paid') {
    try {
      setLoadingMail(true); // 🔵 mostrar loader
      const nameForMail = data?.name ?? row.name;
      const emailForMail = data?.email ?? row.email;
      await sendPaymentEmail({ name: nameForMail, email: emailForMail });
      showNotification(`Correo de confirmación enviado a ${nameForMail} ✅`);
    } catch (e) {
      console.error('Mail error:', e);
      showNotification('Pago actualizado, pero falló el envío de correo', 'error');
    } finally {
      setLoadingMail(false); // 🔴 ocultar loader
    }
  }
};




  const handleDelete = async (userId) => {
    const snapshot = subscribers;
    setSubscribers(prev => prev.filter(u => u.id !== userId));

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error(error);
      setSubscribers(snapshot);
      showNotification('No se pudo eliminar', 'error');
      return;
    }
    setShowDeleteModal(null);
    showNotification('Participante eliminado');
  };

  const handleEdit = (user) => setEditingUser({ ...user });

const saveEdit = async () => {
  const { id, name, phone, city } = editingUser;

  const old = subscribers.find(u => u.id === id);
  if (!old) return;

  const ok = window.confirm(
    `¿Guardar cambios de "${old.name}"?\n\n` +
    `Nombre: ${old.name} → ${name}\n` +
    `Teléfono: ${old.phone || '-'} → ${phone || '-'}\n` +
    `Ciudad: ${old.city || '-'} → ${city || '-'}\n`
  );
  if (!ok) return;

  // Optimista
  setSubscribers(prev =>
    prev.map(u => (u.id === id ? { ...u, name, phone, city } : u))
  );

  const { error } = await supabase
    .from('registrations')
    .update({ name, phone, city })
    .eq('id', id);

  if (error) {
    setSubscribers(prev => prev.map(u => (u.id === id ? old : u))); // revertir
    console.error(error);
    showNotification('No se pudo actualizar', 'error');
    return;
  }

  setEditingUser(null);
  showNotification('Participante actualizado');
};



  const sendEmail = (user) => {
    const subject = encodeURIComponent('UCB Masters of Cocktail 2025');
    const body = encodeURIComponent(
      `Hola ${user.name},\n\n` +
      (user.paymentStatus === 'unpaid'
        ? 'Vimos que tu pago aún está pendiente. Puedes completarlo para asegurar tu cupo.\n\n'
        : '¡Gracias por tu pago! Tu inscripción está confirmada.\n\n') +
      'Saludos,\nEquipo UBC'
    );
    window.open(`mailto:${user.email}?subject=${subject}&body=${body}`, '_blank');
    showNotification(`Email preparado para ${user.name}`);
  };

  // 4) Filtros + paginación
  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return subscribers.filter(u => {
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone ?? '').includes(searchTerm);
      const matchesStatus = paymentFilter === 'all' || u.paymentStatus === paymentFilter;
      return matchesSearch && matchesStatus;
    });
  }, [subscribers, searchTerm, paymentFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const paidCount = subscribers.filter((u) => u.paymentStatus === 'paid').length;
  const unpaidCount = subscribers.filter((u) => u.paymentStatus === 'unpaid').length;

 const exportData = () => {
  // ✅ BOM para que Excel detecte UTF-8 (tildes/ñ bien)
  const BOM = '\uFEFF';

  const csvContent = [
    ['Nombre', 'Email', 'Telefono', 'Ciudad', 'Fecha de Registro', 'Estado de Pago', 'Fecha de Pago'],
    ...filteredData.map((u) => [
      u.name ?? '',
      u.email ?? '',
      u.phone ?? '',
      u.city ?? '',
      formatDate(u.registrationDate),
      u.paymentStatus === 'paid' ? 'Pagado' : 'No pagado',
      u.paymentDate ? formatDate(u.paymentDate) : '',
    ]),
  ]
    .map((row) =>
      row
        .map((cell) => {
          const c = String(cell ?? '');
          // Escapar comillas, saltos y comas
          return /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
        })
        .join(',')
    )
    .join('\n');

  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'inscripciones.csv';
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url); // ✅ limpia memoria

  showNotification('Datos exportados');
};


  const handleSearch = (v) => { setSearchTerm(v); setCurrentPage(1); };
  const handleFilter = (v) => { setPaymentFilter(v); setCurrentPage(1); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NotificationToast notification={notification} />

      <div className="p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-2">
              Panel Administrativo
            </h1>
            <p className="text-gray-400">Gestión de inscripciones - UBC Masters of Cocktail 2026 </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {loadingContest || loadingTable ? (
          <div className="text-gray-400">Cargando datos…</div>
        ) : (
          <>
            <HeaderStats total={subscribers.length} paid={paidCount} unpaid={unpaidCount} />

            <ControlsBar
              searchTerm={searchTerm}
              setSearchTerm={handleSearch}
              paymentFilter={paymentFilter}
              setPaymentFilter={handleFilter}
              onExport={exportData}
            />

            <SubscribersTable
              data={currentData}
              onTogglePayment={togglePayment}
              onSendEmail={sendEmail}
              onEdit={handleEdit}
              onDeleteAsk={setShowDeleteModal}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              onNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
            />
          </>
        )}
      </div>

      <EditUserModal editingUser={editingUser} setEditingUser={setEditingUser} onSave={saveEdit} />

      <DeleteConfirmModal
        showId={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(null)}
      />
          <Preloaded visible={loadingMail} />

    </div>
  );
}
