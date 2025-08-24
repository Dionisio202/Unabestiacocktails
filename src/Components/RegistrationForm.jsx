import { useState } from 'react';
import move3 from '../assets/page/move3.png';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre completo es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un teléfono válido';
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

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('¡Inscripción enviada exitosamente!');
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
    } catch (error) {
      alert('Hubo un error al enviar la inscripción. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 id="register" className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Inscríbete Ahora
          </h1>
          <p className="text-gray-300 text-lg mb-12">
            Completa el formulario para comenzar tu experiencia
          </p>
          
          {/* Imagen centrada debajo del texto */}
          <div className="flex justify-center mb-12">
            <div className="relative group max-w-xs sm:max-w-sm">
              {/* Efectos decorativos alrededor de la imagen */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-500/10 to-red-500/10 rounded-3xl"></div>
              
              {/* Contenedor de la imagen */}
              <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 shadow-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <img 
                  src={move3}
                  alt="Inscripción - Imagen promocional" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay sutil con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
              </div>
              
              {/* Puntos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Formulario centrado */}
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
              />

              <Input
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="tu@email.com"
              />

              <Input
                label="Teléfono *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+593 99 123 4567"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
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
              ) : (
                'Enviar Inscripción'
              )}
            </button>

            <p className="text-gray-400 text-sm text-center mt-6">
              * Campos obligatorios
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ¿Tienes preguntas? <button
                onClick={() =>
                  window.open(
                    "https://wa.me/593999817566?text=Hola%20tengo%20una%20consulta%20sobre%20la%20inscripci%C3%B3n",
                    "_blank",
                    "noopener,noreferrer"
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
      />
      {error && (
        <p className="text-red-400 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}