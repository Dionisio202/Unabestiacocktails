import React, { useState } from 'react';
import { Calendar, MapPin, Trophy, Users, Clock, Star, ChevronDown, Menu, X } from 'lucide-react';

export default function CocktailCompetition() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    category: '',
    cocktailName: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.experience || !formData.category) {
      alert('Por favor completa todos los campos requeridos (*)');
      return;
    }
    alert('¡Inscripción enviada exitosamente! Te contactaremos pronto.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-500/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Grupo Una Bestia Cocktails
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-amber-400 transition-colors">Inicio</a>
              <a href="#competition" className="hover:text-amber-400 transition-colors">Competencia</a>
              <a href="#rules" className="hover:text-amber-400 transition-colors">Reglas</a>
              <a href="#register" className="hover:text-amber-400 transition-colors">Inscríbete</a>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <a href="#home" className="block py-2 hover:text-amber-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Inicio</a>
              <a href="#competition" className="block py-2 hover:text-amber-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Competencia</a>
              <a href="#rules" className="block py-2 hover:text-amber-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Reglas</a>
              <a href="#register" className="block py-2 hover:text-amber-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Inscríbete</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent leading-tight">
              UCB Masters
              <br />
              of Cocktail
            </h1>
            <div className="text-3xl md:text-4xl font-semibold text-amber-300 mb-8">
              Ambato 2025
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Octubre 2025</h3>
              <p className="text-gray-300">Fecha por confirmar</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ambato</h3>
              <p className="text-gray-300">Tungurahua, Ecuador</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premios</h3>
              <p className="text-gray-300">Reconocimiento y premios</p>
            </div>
          </div>

          <div className="space-y-6">
            <a 
              href="#register" 
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all shadow-lg"
            >
              Inscríbete Ahora
            </a>
            <div className="text-gray-300">
              <p className="text-lg">La competencia más prestigiosa de coctelería en Ambato</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </div>
      </section>

      {/* Competition Details */}
      <section id="competition" className="py-20 bg-gradient-to-b from-transparent to-black/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Sobre la Competencia
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-amber-300">UCB Masters of Cocktail</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                La competencia más emocionante de coctelería llega a Ambato. Bartenders de toda la región se reunirán para demostrar sus habilidades, creatividad y pasión por el arte de la mixología.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Esta competencia forma parte del ecosistema de Grupo Una Bestia Cocktails, que incluye nuestros servicios de catering, organización de eventos y The Frose Pop Bar.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="w-6 h-6 text-amber-400" />
                  <span className="text-gray-300">Bartenders profesionales y amateur</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <span className="text-gray-300">Competencia por categorías</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Star className="w-6 h-6 text-amber-400" />
                  <span className="text-gray-300">Jurado especializado</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-500/20">
              <h4 className="text-2xl font-bold mb-6 text-amber-300">Categorías</h4>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Clásico</h5>
                  <p className="text-gray-300 text-sm">Cócteles tradicionales con técnica perfecta</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Creativo</h5>
                  <p className="text-gray-300 text-sm">Innovación y originalidad en cada sorbo</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-400 mb-2">Speed Round</h5>
                  <p className="text-gray-300 text-sm">Velocidad y precisión bajo presión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Reglas y Requisitos
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 backdrop-blur-sm border border-amber-500/20">
                <h3 className="text-2xl font-bold mb-6 text-amber-300">Requisitos Generales</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mayor de 18 años</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Experiencia en bartending (mínimo 6 meses)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Traer herramientas propias de bar</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Registro completo antes del evento</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 backdrop-blur-sm border border-amber-500/20">
                <h3 className="text-2xl font-bold mb-6 text-amber-300">Criterios de Evaluación</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Técnica y presentación (40%)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Sabor y equilibrio (35%)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Creatividad e innovación (15%)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Limpieza y organización (10%)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 bg-gradient-to-b from-black/30 to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Inscríbete Ahora
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-amber-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white placeholder-gray-400"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white placeholder-gray-400"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white placeholder-gray-400"
                    placeholder="+593 99 999 9999"
                  />
                </div>
                
                <div>
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Experiencia *</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                  >
                    <option value="">Selecciona...</option>
                    <option value="6months-1year">6 meses - 1 año</option>
                    <option value="1-3years">1 - 3 años</option>
                    <option value="3-5years">3 - 5 años</option>
                    <option value="5plus">Más de 5 años</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Categoría *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white"
                  >
                    <option value="">Selecciona categoría...</option>
                    <option value="classic">Clásico</option>
                    <option value="creative">Creativo</option>
                    <option value="speed">Speed Round</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Nombre de tu cóctel signature</label>
                  <input
                    type="text"
                    name="cocktailName"
                    value={formData.cocktailName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white placeholder-gray-400"
                    placeholder="Nombre de tu creación"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-amber-300 text-sm font-semibold mb-2">Breve descripción de tu experiencia</label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg focus:border-amber-400 focus:outline-none text-white placeholder-gray-400 resize-none"
                    placeholder="Cuéntanos sobre tu experiencia en bartending..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:scale-102 transition-all shadow-lg"
                >
                  Enviar Inscripción
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 py-12 border-t border-amber-500/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Grupo Una Bestia Cocktails
              </h3>
              <p className="text-gray-300 mb-4">
                El ecosistema completo de coctelería en Ecuador
              </p>
              <div className="space-y-2 text-gray-400">
                <p>• Una Bestia Cocktails (Catering)</p>
                <p>• UCB Masters of Cocktail (Competencias)</p>
                <p>• The Frose Pop Bar (Granizados)</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-300">Contacto</h4>
              <div className="space-y-2 text-gray-300">
                <p>📧 info@unabestiacocktails.com</p>
                <p>📱 +593 99 999 9999</p>
                <p>📍 Ambato, Tungurahua</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-300">Síguenos</h4>
              <div className="space-y-2 text-gray-300">
                <p>Instagram: @unabestiacocktails</p>
                <p>Facebook: Una Bestia Cocktails</p>
                <p>TikTok: @unabestiacocktails</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-500/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Grupo Una Bestia Cocktails. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}