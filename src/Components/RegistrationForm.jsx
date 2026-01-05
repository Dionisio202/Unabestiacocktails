import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import backgroundImage from "../assets/page/background.png";

const CONTEST_SLUG = "ucb-masters-001-2026";

const MAILER_URL = import.meta.env.VITE_MAILER_URL;
const MAILER_API_KEY = import.meta.env.VITE_MAILER_API_KEY;

async function sendRegistrationMail({ name, email }) {
  if (!MAILER_URL || !MAILER_API_KEY) return;

  const contestName = "ucb-masters-001-2026";

  const res = await fetch(`${MAILER_URL}/api/mails/registration-received`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MAILER_API_KEY}`,
    },
    body: JSON.stringify({ name, email, contestName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "SEND_FAILED");
  }
}

const NAME_ALLOWED = /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ'' \-]/g;
const collapseSpaces = (s) => s.replace(/\s+/g, " ").trim();

function sanitizeNameOnChange(raw) {
  return raw.replace(NAME_ALLOWED, "");
}
function countSpaces(str) {
  return (str.match(/ /g) || []).length;
}
function sanitizePhone(raw) {
  let v = raw.replace(/[^\d+]/g, "");
  if (v.includes("+")) {
    v = (v.startsWith("+") ? "+" : "") + v.replace(/[+]/g, "").replace(/[^\d+]/g, "");
  }
  return v;
}
function isValidEmail(email) {
  const e = email.trim();
  if (/\s/.test(e)) return false;
  if (e.includes("..")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}
function isValidEcPhone(phone) {
  const p = phone.trim();
  if (/^\d{10}$/.test(p)) return true;
  if (/^\+593\d{9}$/.test(p)) return true;
  return false;
}
function normalizePhoneForSave(phone) {
  const p = phone.trim().replace(/\s+/g, "");
  if (/^\d{10}$/.test(p) && p.startsWith("0")) {
    return "+593" + p.slice(1);
  }
  return p;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contestId, setContestId] = useState(null);
  const [loadingContest, setLoadingContest] = useState(true);

  useEffect(() => {
    (async () => {
      setLoadingContest(true);

      const { data, error } = await supabase
        .from("contests")
        .select("id")
        .eq("slug", CONTEST_SLUG)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error(error);
        alert("No se pudo cargar el concurso. Intenta más tarde.");
      } else if (!data) {
        alert("Concurso no disponible o inactivo.");
      } else {
        setContestId(data.id);
      }

      setLoadingContest(false);
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === "name") v = sanitizeNameOnChange(v);
    if (name === "phone") v = sanitizePhone(v);

    setFormData((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((s) => ({ ...s, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    const city = formData.city.trim();
    if (!city) newErrors.city = "La ciudad es requerida";
    else if (city.length < 2) newErrors.city = "Ingresa una ciudad válida";

    const rawName = formData.name;
    if (!rawName.trim()) {
      newErrors.name = "El nombre completo es requerido";
    } else if (NAME_ALLOWED.test(rawName)) {
      newErrors.name = "El nombre solo puede contener letras, espacios, guiones y apóstrofes";
    } else if (rawName.replace(/\s/g, "").length < 3) {
      newErrors.name = "Ingresa al menos 3 caracteres alfabéticos";
    } else if (countSpaces(rawName) > 6) {
      newErrors.name = "El nombre no puede tener más de 6 espacios";
    }

    const email = formData.email.trim();
    if (!email) newErrors.email = "El email es requerido";
    else if (!isValidEmail(email)) newErrors.email = "Por favor ingresa un email válido";

    const phoneRaw = formData.phone.trim();
    if (!phoneRaw) newErrors.phone = "El teléfono es requerido";
    else if (!isValidEcPhone(phoneRaw)) {
      newErrors.phone = "Formato válido: 10 dígitos (ej. 09XXXXXXXX) o +5939XXXXXXXX";
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
      alert("El concurso no está disponible en este momento.");
      return;
    }

    setIsSubmitting(true);
    try {
      const name = collapseSpaces(formData.name);
      const email = formData.email.trim().toLowerCase();
      const phone = normalizePhoneForSave(formData.phone);
      const city = collapseSpaces(formData.city);

      const { error } = await supabase
        .from("registrations")
        .insert([{ contest_id: contestId, name, email, phone, city }]);

      if (error) {
        if (error.code === "23505") {
          setErrors((s) => ({ ...s, email: "Este email ya está inscrito en este concurso." }));
          return;
        }
        console.error(error);
        alert("Hubo un error al enviar la inscripción. Intenta nuevamente.");
        return;
      }

      try {
        await sendRegistrationMail({ name, email });
        alert(
          "¡Inscripción enviada exitosamente!\n\n" +
            "En breve nos pondremos en contacto por WhatsApp o email para coordinar el pago y asegurar tu cupo."
        );
      } catch (mailErr) {
        console.error("Fallo al enviar correo de bienvenida:", mailErr);
        alert(
          "¡Inscripción enviada exitosamente!\n\n" +
            "No pudimos enviar el correo de bienvenida en este momento, pero nos pondremos en contacto por WhatsApp o email para coordinar el pago y asegurar tu cupo."
        );
      }

      setFormData({ name: "", email: "", phone: "", city: "" });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const BACKGROUND_FIT = "cover";
  const bgFitClass = BACKGROUND_FIT === "contain" ? "object-contain" : "object-cover";

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className={`h-full w-full ${bgFitClass} object-center`}
          draggable="false"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(245,158,11,0.18),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(249,115,22,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center">
          <h1
            id="register"
            className="font-serif font-black tracking-wide leading-none text-[clamp(40px,6.8vw,92px)] text-amber-200 drop-shadow-[0_10px_20px_rgba(0,0,0,0.75)]"
          >
            ¡Inscríbete Ahora!
          </h1>

          <p className="mt-4 font-serif text-white/90 leading-snug drop-shadow-[0_8px_14px_rgba(0,0,0,0.7)] text-[clamp(18px,2.6vw,34px)]">
            Llena el siguiente formulario para comenzar tu inscripción
          </p>
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <div className="w-full max-w-[520px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-amber-500/20 bg-[#0B1220]/80 backdrop-blur-md shadow-[0_22px_70px_rgba(0,0,0,0.6)] p-6 sm:p-8"
            >
              <div className="space-y-5">
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
                 
                />

                <Input
                  label="Ciudad *"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  placeholder="Ej. Ambato"
                  disabled={isSubmitting || loadingContest}
                  autoComplete="address-level2"
                  maxLength={60}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loadingContest}
                className="mt-7 w-full rounded-xl py-3.5 text-base sm:text-lg font-black text-white
                           bg-gradient-to-r from-amber-500 to-orange-600
                           hover:from-amber-600 hover:to-orange-700
                           disabled:from-gray-600 disabled:to-gray-700
                           shadow-[0_14px_40px_rgba(245,158,11,0.20)]
                           transition-all duration-300
                           disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : loadingContest ? "Cargando concurso…" : "Enviar Inscripción"}
              </button>

              <p className="text-center mt-4 text-white/60 text-sm">* Campos obligatorios</p>
            </form>

            <div className="text-center mt-5">
              <p className="text-white/70 text-sm">
                ¿Tienes preguntas?{" "}
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://wa.me/593999817566?text=Hola%20tengo%20una%20consulta%20sobre%20la%20inscripci%C3%B3n",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  Contáctanos
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <div className="text-center">
            <div className="font-serif font-black tracking-widest text-amber-200 drop-shadow-[0_10px_18px_rgba(0,0,0,0.75)] text-[clamp(20px,2.4vw,34px)]">
              UBC MASTERS OF COCKTAIL
            </div>
            <div className="mt-1 text-white/85 tracking-[0.22em] text-[clamp(11px,1.2vw,14px)]">
              BAÑOS DE AGUA SANTA • FEBRERO 2026
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @supports (-webkit-text-stroke: 1px black) {
          #register {
            -webkit-text-stroke: 1px rgba(0,0,0,0.35);
          }
        }
      `}</style>
    </section>
  );
}

function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-2">
      <label className="block text-amber-200 text-sm font-semibold">{label}</label>

      <input
        {...props}
        className={[
          "w-full px-4 py-3 rounded-lg text-white placeholder-white/45",
          "bg-black/35 border transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50",
          error
            ? "border-red-500/80 focus:ring-red-500/40 focus:border-red-500/80"
            : "border-amber-500/20 hover:border-amber-500/35",
          className,
        ].join(" ")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${props.name}-error` : undefined}
      />

      {error && (
        <p id={`${props.name}-error`} className="text-red-300 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
