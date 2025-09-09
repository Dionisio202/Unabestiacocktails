import { useEffect, useState } from 'react';
import move3 from '../assets/page/move3.png';
import backgroundImage from '../assets/page/background.png'; // Ajusta la ruta según tu estructura
import { supabase } from '../lib/supabase';

const CONTEST_SLUG = 'ucb-masters-2025';

// ------- Config del mailer (Frontend → tu servidor Node) -------
const MAILER_URL = import.meta.env.VITE_MAILER_URL;      // p.ej. https://mailserver.onrender.com
const MAILER_API_KEY = import.meta.env.VITE_MAILER_API_KEY;

// Llama al endpoint de tu servidor para enviar el correo de "inscripción recibida"
async function sendRegistrationMail({ name, email }) {
  if (!MAILER_URL || !MAILER_API_KEY) {
    console.warn('MAILER_URL o MAILER_API_KEY no definidos');
    return;
  }
  const contestName = 'UCB Masters of Cocktail Ambato 2025';

  const res = await fetch(`${MAILER_URL}/api/mails/registration-received`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MAILER_API_KEY}`,
    },
    body: JSON.stringify({ name, email, contestName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'SEND_FAILED');
  }
}

// ---------- Helpers de sanitización y validación ----------
const NAME_ALLOWED = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ'' \-]/g; // todo lo que NO permitimos
const collapseSpaces = (s) => s.replace(/\s+/g, ' ').trim();

// Durante la escritura: NO trim, NO collapse; solo filtra caracteres no permitidos
function sanitizeNameOnChange(raw) {
  return raw.replace(NAME_ALLOWED, '');
}
function countSpaces(str) {
  return (str.match(/ /g) || []).length;
}
function sanitizePhone(raw) {
  let v = raw.replace(/[^\d+]/g, '');
  if (v.includes('+')) {
    v = (v.startsWith('+') ? '+' : '') + v.replace(/[+]/g, '').replace(/[^\d+]/g, '');
  }
  return v;
}
function isValidEmail(email) {
  const e = email.trim();
  if (/\s/.test(e)) return false;
  if (e.includes('..')) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}
// Teléfono Ecuador: 10 dígitos locales o +593 + 9 dígitos
function isValidEcPhone(phone) {
  const p = phone.trim();
  if (/^\d{10}$/.test(p)) return true;
  if (/^\+593\d{9}$/.test(p)) return true;
  return false;
}
function normalizePhoneForSave(phone) {
  const p = phone.trim().replace(/\s+/g, '');
  if (/^\d{10}$/.test(p) && p.startsWith('0')) {
    return '+593' + p.slice(1);
  }
  return p;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contestId, setContestId] = useState(null);
  const [loadingContest, setLoadingContest] = useState(true);

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
        alert('No se pudo cargar el concurso. Intenta más tarde.');
      } else if (!data) {
        alert('Concurso no disponible o inactivo.');
      } else {
        setContestId(data.id);
      }
      setLoadingContest(false);
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === 'name') v = sanitizeNameOnChange(v);
    if (name === 'phone') v = sanitizePhone(v);

    setFormData((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    const rawName = formData.name;
    if (!rawName.trim()) {
      newErrors.name = 'El nombre completo es requerido';
    } else if (NAME_ALLOWED.test(rawName)) {
      newErrors.name = 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    } else if (rawName.replace(/\s/g, '').length < 3) {
      newErrors.name = 'Ingresa al menos 3 caracteres alfabéticos';
    } else if (countSpaces(rawName) > 6) {
      newErrors.name = 'El nombre no puede tener más de 6 espacios';
    }

    const email = formData.email.trim();
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    const phoneRaw = formData.phone.trim();
    if (!phoneRaw) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!isValidEcPhone(phoneRaw)) {
      newErrors.phone = 'Formato válido: 10 dígitos (ej. 09XXXXXXXX) o +5939XXXXXXXX';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!contestId) {
      alert('El concurso no está disponible en este momento.');
      return;
    }

    setIsSubmitting(true);
    try {
      const name = collapseSpaces(formData.name);
      const email = formData.email.trim().toLowerCase();
      const phone = normalizePhoneForSave(formData.phone);

      const { error } = await supabase
        .from('registrations')
        .insert([{ contest_id: contestId, name, email, phone }]);

      if (error) {
        if (error.code === '23505') {
          setErrors((s) => ({ ...s, email: 'Este email ya está inscrito en este concurso.' }));
          return;
        }
        console.error(error);
        alert('Hubo un error al enviar la inscripción. Intenta nuevamente.');
        return;
      }

      // Intentar enviar el correo de "inscripción recibida"
      try {
        await sendRegistrationMail({ name, email });
        alert(
          '¡Inscripción enviada exitosamente! 🎉\n\n' +
          'En breve nos pondremos en contacto por WhatsApp o email para coordinar el pago y asegurar tu cupo.'
        );
      } catch (mailErr) {
        console.error('Fallo al enviar correo de bienvenida:', mailErr);
        alert(
          '¡Inscripción enviada exitosamente! 🎉\n\n' +
          'No pudimos enviar el correo de bienvenida en este momento, pero nos pondremos en contacto por WhatsApp o email para coordinar el pago y asegurar tu cupo.'
        );
      }

      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4 py-8">
      {/* Imagen de fondo transparentada - Opción 1: Imagen fija */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Contenido principal - ahora con z-index para estar encima */}
      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 id="register" className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Inscríbete Ahora
          </h1>
          <p className="text-gray-300 text-lg mb-12">
            Completa el formulario para comenzar tu experiencia
          </p>

          <div className="flex justify-center mb-12">
            <div className="relative group max-w-xs sm:max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-500/10 to-red-500/10 rounded-3xl"></div>
              <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 shadow-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <img
                  src={move3}
                  alt="Inscripción - Imagen promocional"
                  className="max-h-52 w-auto mx-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-amber-500/20 shadow-2xl">
            <div className="space-y-6">
              <Input
                label="Nombre completo *"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Ingresa tu nombre completo"
                disabled={isSubmitting || loadingContest}
                autoComplete="name"
                inputMode="text"
                maxLength={80}
              />

              <Input
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="tu@email.com"
                disabled={isSubmitting || loadingContest}
                autoComplete="email"
                inputMode="email"
                maxLength={120}
              />

              <Input
                label="Teléfono *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+5939XXXXXXXX o 09XXXXXXXX"
                disabled={isSubmitting || loadingContest}
                autoComplete="tel"
                inputMode="tel"
                maxLength={13}
                pattern="(\+593\d{9}|\d{10})"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || loadingContest}
              className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : loadingContest ? 'Cargando concurso…' : 'Enviar Inscripción'}
            </button>

            <p className="text-gray-400 text-sm text-center mt-6">
              * Campos obligatorios
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Tienes preguntas?{' '}
              <button
                onClick={() =>
                  window.open(
                    'https://wa.me/593999817566?text=Hola%20tengo%20una%20consulta%20sobre%20la%20inscripci%C3%B3n',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
              >
                Contáctanos
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      <label className="block text-amber-300 text-sm font-semibold">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 ${
          error
            ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
            : 'border-amber-500/30 hover:border-amber-500/50'
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${props.name}-error` : undefined}
      />
      {error && (
        <p id={`${props.name}-error`} className="text-red-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}