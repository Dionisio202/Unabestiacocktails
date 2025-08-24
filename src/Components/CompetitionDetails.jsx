import { Users, Clock, Star } from 'lucide-react';
import move from '../assets/page/move.png';

export default function CompetitionDetails() {
  return (
    <section id="competition" className="py-20 bg-gradient-to-b from-transparent to-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Encabezado con imagen a la derecha */}
<div className="mb-16 flex flex-col items-center gap-4 sm:flex-row justify-center">
  <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-center sm:text-left">
    Sobre la Competencia
  </h2>

  <img
    src={move}
    alt="UCB Masters of Cocktail"
    className="h-50 sm:h-16 md:h-20 lg:h-24 w-auto drop-shadow-[0_6px_18px_rgba(251,191,36,0.25)]"
    loading="eager"
    draggable="false"
  />
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-amber-300">UCB Masters of Cocktail</h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                La competencia más emocionante de coctelería llega a Ambato. Bartenders de toda la región se reunirán para demostrar sus habilidades, creatividad y pasión por el arte de la mixología.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
                Esta competencia forma parte del ecosistema de Grupo Una Bestia Cocktails, que incluye nuestros servicios de catering, organización de eventos y The Frose Pop Bar.
              </p>

            <div className="space-y-4">
              <Detail icon={<Users />} text="Bartenders profesionales y amateur" />
              <Detail icon={<Star />} text="Jurado especializado" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl p-8 backdrop-blur-sm border border-amber-500/20">
            <h4 className="text-2xl font-bold mb-6 text-amber-300">Categoría</h4>
            <Category name="Creativo - Clásico" desc="Una fusión perfecta entre la innovación moderna y la técnica tradicional de coctelería" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 text-amber-400">{icon}</div>
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function Category({ name, desc }) {
  return (
    <div className="bg-black/30 rounded-lg p-4 mb-4">
      <h5 className="font-semibold text-amber-400 mb-2">{name}</h5>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}