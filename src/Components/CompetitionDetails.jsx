import move from '../assets/page/logo_comp.png';

// Check “outline” como en el arte
function Check() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#F59E0B" strokeWidth="2" />
      <path d="M7 12l3 3 7-7" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CompetitionDetails() {
  return (
    <section className="min-h-screen py-16" style={{ backgroundColor: '#353031' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Izquierda */}
          <div>
            <h1
              className="mb-8 text-center lg:text-left uppercase font-black
                         text-4xl sm:text-5xl lg:text-6xl
                         tracking-wide text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.35)]"
            >
              ¿Cómo <span className="text-white">Participar</span>?
            </h1>

            <div className="flex justify-center lg:justify-start">
              <img
                src={move}
                alt="UBC Masters of Cocktail"
                className="w-[520px] max-w-[88vw] h-auto drop-shadow-[0_12px_40px_rgba(240,171,0,0.25)]"
                draggable="false"
              />
            </div>
          </div>

          {/* Derecha */}
          <div className="space-y-8">
            <Step
              n="1"
              title="Registro"
              items={[
                'Registre su información',
                'Confirmación y pago',
                'Bienvenida',
              ]}
            />
            <Divider />
            <Step
              n="2"
              title="Tu coctel"
              items={[
                'Usar productos auspiciantes',
                'Control del tiempo y limpieza',
                'Equilibrio de sabores',
              ]}
            />
            <Divider />
            <Step
              n="3"
              title="Comparte"
              items={[
                'Compartir los post oficiales',
                'Mencionar en historias a UBC',
                'Etiquetar tu bar o restaurante',
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Componentes auxiliares */

function Step({ n, title, items }) {
  return (
    <div className="flex items-start gap-6">
      <div
        className="rounded-[22px] w-16 h-20 lg:w-20 lg:h-24 flex items-center justify-center flex-shrink-0
                   shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.25)]
                   border-[3px] border-[#C57A1B] bg-[#2E2A2B]"
      >
        <span className="text-white font-black text-3xl lg:text-4xl drop-shadow-[0_3px_0_rgba(0,0,0,0.35)]">
          {n}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="uppercase font-black text-[color:#F5A623] text-2xl lg:text-3xl tracking-wide drop-shadow-[0_3px_0_rgba(0,0,0,0.35)] mb-2">
          {title}
        </h3>

        <div className="space-y-2">
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check />
              <span className="text-white/90 text-base lg:text-[17px]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[3px] w-full"
         style={{
           background:
             'linear-gradient(90deg, rgba(0,0,0,0) 0%, #C57A1B 15%, #C57A1B 85%, rgba(0,0,0,0) 100%)',
         }} />
  );
}
