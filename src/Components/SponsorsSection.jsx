import { useEffect, useState } from "react";
import calaca from "../assets/calaca.jpeg";
import casa_ambatena from "../assets/casa_ambatena.png";
import move2 from '../assets/page/move2.png';
import hogera from "../assets/hogera.jpeg";   // La Hoguera Asadero
import integra from "../assets/integra.PNG";  // cuidado: extensión en MAYÚSCULAS
import agraz from "../assets/agraz.jpeg";     // AGRAZ London Dry Gin
export default function SponsorsSection() {
  const [isVisible, setIsVisible] = useState({});

  // Mezcla TODOS los sponsors en un solo arreglo
  const sponsors = [
    // Principales
    { id: 1, name: "Hotel Casa Ambateña", tier: "main", website: "#", logo: casa_ambatena },
    { id: 2, name: "Tequila Calaca",  tier: "main", website: "#", logo: calaca },
    { id: 3, name: "La Hoguera Asadero",  tier: "gold",   website: "#", logo: hogera },
    { id: 4, name: "INTEGRA FILMS",       tier: "silver", website: "#", logo: integra },
    { id: 5, name: "AGRAZ London Dry Gin",tier: "silver", website: "#", logo: agraz },
  ];

  // Orden para que los más importantes aparezcan primero (sin separarlos)
  const order = { main: 0, gold: 1, silver: 2 };
  const sorted = [...sponsors].sort((a, b) => order[a.tier] - order[b.tier]);

  // Animación en scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setIsVisible(p => ({ ...p, [e.target.id]: true }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sponsor-item").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-black/30 to-transparent relative overflow-hidden">
      {/* fondo decorativo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-16 flex flex-col items-center gap-8 sm:flex-row justify-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            Nuestros Auspiciantes
          </h2>
          <img
              src={move2}
              alt="UCB Masters of Cocktail"
              className="h-50 sm:h-16 md:h-20 lg:h-36 w-auto drop-shadow-[0_6px_18px_rgba(251,191,36,0.25)]"
              loading="eager"
              draggable="false"
            />
            </div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Gracias a estas marcas por hacer posible UBC Masters of Cocktail 2025
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
          </div>
        </div>

        {/* Container centrado que se adapta al número de sponsors */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
            {sorted.map((s, idx) => (
              <SponsorCard
                key={s.id}
                idAttr={`s-${s.id}`}
                sponsor={s}
                delay={idx * 80}
                isVisible={isVisible[`s-${s.id}`]}
              />
            ))}
          </div>
        </div>

        {/* CTA único */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-amber-300">¿Quieres ser auspiciante?</h3>
            <p className="text-gray-300 mb-6">Súmate al evento de coctelería más importante de la región.</p>
            <a
              href="https://wa.me/593999817566?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20patrocinios%20para%20UCB%20Masters%20of%20Cocktail"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorCard({ sponsor, delay = 0, isVisible, idAttr }) {
  // Estiliza sin secciones: tamaño y borde sutil según "tier"
  const styleByTier = {
    main:  "p-6 md:p-7 border-amber-400/40 ring-1 ring-amber-400/10",
    gold:  "p-5 md:p-6 border-yellow-400/30 ring-1 ring-yellow-300/5",
    silver:"p-4 md:p-5 border-gray-300/25"
  };

  return (
    <div
      id={idAttr}
      className={`sponsor-item bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl border transition-all duration-700
                  hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer
                  ${styleByTier[sponsor.tier]} transform w-80 max-w-sm
                  ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => sponsor.website && window.open(sponsor.website, "_blank")}
      title={sponsor.name}
    >
      <div className="flex flex-col items-center text-center gap-3">
        {/* Caja del logo: ocupa todo el ancho, relación 16:9, logo 100% centrado */}
        <div className="relative w-full rounded-lg bg-white shadow-md overflow-hidden">
          <div className="aspect-[16/9] w-full flex items-center justify-center p-3">
            <img
              src={sponsor.logo}
              alt={`Logo ${sponsor.name}`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* brillo opcional */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </div>

        <h4 className="font-semibold text-white text-sm md:text-base">{sponsor.name}</h4>
      </div>
    </div>
  );
}