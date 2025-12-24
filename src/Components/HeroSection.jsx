import { Calendar, MapPin, Trophy, ChevronDown } from 'lucide-react';
import logo_comp from '../assets/page/logo_comp.png';
import background_image from '../assets/page/bg-herox3.jpeg'; // Ajusta la ruta según tu estructura

export default function HeroSection() {
  return (
    <section
      id="home"
className="min-h-[100vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Gradiente adicional para el efecto amber/orange */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center relative z-10">
        {/*  <img
          src={logo_comp}
          alt="UCB Masters of Cocktail - Logo"
className="mx-auto mb-6 h-82 sm:h-64 md:h-80 lg:h-[28rem] w-auto"
          loading="eager"
          draggable="false"
        />
       
       */}

      
      </div>

    
    </section>
  );
}

function Card({ icon, title, text, isLocation = false, mapEmbedUrl, mapsLink }) {
  return (
    <div className="group relative">
      {/* Card */}
      <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-500/20 text-left
                      transition-all duration-300
                      group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:border-amber-400/60">

        {/* Fondo decorativo sutil que aparece en hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
                     group-hover:opacity-100
                     bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(249,115,22,0.1),transparent_40%)]"
          aria-hidden
        />

        {/* Contenido */}
        <div className="relative">
          <div className="w-8 h-8 text-amber-400 mx-auto mb-4 flex justify-center items-center">{icon}</div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center text-white">{title}</h3>
          <p className="text-gray-300 text-sm sm:text-base text-center mb-4">{text}</p>

          {isLocation && (
            <div className="mt-2 space-y-3">
              {/* Mapa embebido */}
              <div className="relative w-full overflow-hidden rounded-lg border border-amber-500/20">
                <div className="aspect-[16/9]">
                  <iframe
                    title="Mapa de ubicación: Hotel Casa Ambateña, Miraflores, Ambato"
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Botón a Google Maps */}
              <div className="text-center">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}