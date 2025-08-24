export const formatDate = (dateString) => {
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
export const toInputDateTime = (dateString) => {
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


export const fromInputDateTime = (value) => {
if (!value) return null;
const local = new Date(value);
return local.toISOString();
};