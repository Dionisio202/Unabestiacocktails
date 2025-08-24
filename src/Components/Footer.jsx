import { Mail, Phone, MapPin, Instagram, Facebook, Utensils, GraduationCap, Building, Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header del Footer */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Grupo Una Bestia Cocktails
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            El ecosistema completo de coctelería en Ecuador
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Servicios */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              Nuestros Servicios
            </h4>
            
            <div className="space-y-4">
              {/* Catering */}
              <div className="group">
                <div className="flex items-center gap-2 text-amber-200 font-medium mb-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  Catering de Coctelería
                </div>
                <div className="ml-4 space-y-1 text-gray-300 text-sm">
                  <p>• Cocteles Frosé</p>
                  <p>• Cantaritos</p>
                  <p>• Coctelería Clásica</p>
                </div>
              </div>

              {/* Otros servicios */}
              <div className="flex items-center gap-2 text-amber-200 font-medium">
                <GraduationCap className="w-4 h-4" />
                Escuela de Coctelería
              </div>
              <div className="flex items-center gap-2 text-amber-200 font-medium">
                <Building className="w-4 h-4" />
                Asesoría para Bares y Restaurantes
              </div>
              <div className="flex items-center gap-2 text-amber-200 font-medium">
                <Trophy className="w-4 h-4" />
                Competencias
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-amber-300">Contacto</h4>
            <div className="space-y-4">
              <a 
                href="mailto:info@unabestiacocktails.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>info@unabestiacocktails.com</span>
              </a>
              <a 
                href="tel:+593999817566" 
                className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>+593 999 817 566</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Ambato, Tungurahua</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-amber-300">Síguenos</h4>
            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/unabestia_cocktails/?igsh=NmVxdjB5N212bzFo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-all duration-300 group hover:translate-x-1"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>@unabestia_cocktails</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61577009800477" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-all duration-300 group hover:translate-x-1"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Una Bestia Cocktails</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Grupo Una Bestia Cocktails. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}