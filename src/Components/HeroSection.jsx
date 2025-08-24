import { Calendar, MapPin, Trophy, ChevronDown } from 'lucide-react';
import logo_comp from '../assets/page/logo_comp.png';
export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-88px)] flex items-center justify-center pt-20 pb-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center relative z-10">
         <img
          src={logo_comp}
          alt="UCB Masters of Cocktail - Logo"
          className="mx-auto mb-6 h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_6px_18px_rgba(251,191,36,0.25)]"
          loading="eager"
          draggable="false"
        />
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent leading-tight">
          UCB Masters <br /> of Cocktail
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-300 mb-12">
          Ambato 2025
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          <Card icon={<Calendar />} title="9 de Noviembre" text="2025" />

          <Card
            icon={<MapPin />}
            title="Hotel Casa Ambateña"
            text="Miraflores, Ambato"
            isLocation
            mapEmbedUrl={
              "https://www.google.com/maps?q=Hotel+Casa+Ambate%C3%B1a,+Miraflores,+Ambato&output=embed"
            }
            mapsLink={
              "https://www.google.com/maps/search/?api=1&query=Hotel+Casa+Ambate%C3%B1a,+Miraflores,+Ambato"
            }
          />

          <Card icon={<Trophy />} title="Premios" text="Reconocimiento y premios" />
        </div>

        <a
          href="#register"
          className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Inscríbete Ahora
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
      </div>
    </section>
  );
}

function Card({ icon, title, text, isLocation = false, mapEmbedUrl, mapsLink }) {
  return (
    <div className="group relative">
      {/* Glow exterior en hover */}
   

      {/* Card */}
      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 text-left
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
          <div className="w-8 h-8 text-amber-400 mx-auto mb-4">{icon}</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{title}</h3>
          <p className="text-gray-300 text-center mb-4">{text}</p>

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
