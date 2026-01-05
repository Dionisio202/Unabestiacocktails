import logo_comp from "../assets/page/bg-hero4.png";
import image from "../assets/page/move5.png";

export default function SponsorshipCategories() {
  const columns = [
    {
      key: "uso",
      title: "Uso obligatorio del producto en recetas y escenario (competidores)",
    },
    {
      key: "muestras",
      title: "Muestras dentro del WelcomePack para los competidores",
    },
    {
      key: "etiquetas",
      title: "Etiquetas visibles sobre el escenario",
    },
    {
      key: "mencion",
      title: "Mención en la competencia (animador)",
    },
    {
      key: "logo",
      title: "Logo en background oficial y material digital",
    },
  ];

  const rows = [
    {
      tier: "Oro",
      values: { uso: true, muestras: true, etiquetas: true, mencion: true, logo: true },
    },
    {
      tier: "Plata",
      values: { uso: false, muestras: true, etiquetas: true, mencion: true, logo: true },
    },
    {
      tier: "Bronce",
      values: { uso: false, muestras: false, etiquetas: false, mencion: true, logo: true },
    },
  ];

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(245,158,11,0.14),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(249,115,22,0.10),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.12)_18%,transparent_36%,transparent_64%,rgba(255,255,255,0.10)_82%,transparent_100%)] animate-[shine_7s_linear_infinite]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-12">
        <header className="flex items-center justify-center gap-4 md:gap-6 text-center">
          <div className="shrink-0">
            <img
              src={logo_comp}
              alt="UCB Masters of Cocktail"
              className="h-20 w-20 md:h-35 md:w-35 select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
              draggable="false"
              loading="eager"
            />
          </div>

          <h2 className="text-amber-400 font-black uppercase tracking-wide leading-none text-[clamp(28px,5.2vw,56px)] drop-shadow-[0_6px_0_rgba(0,0,0,0.55)]">
            Categorías de auspicio
          </h2>
        </header>

        <div className="mt-8 md:mt-10">
          <div className="rounded-none border-2 border-white/90 bg-black/40 backdrop-blur-[1px] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[920px]">
                <thead>
                  <tr>
                    <th className="w-[210px] text-left text-white font-black text-2xl px-4 py-4 border-r-2 border-b-2 border-white/90">
                      Categoría
                    </th>
                    {columns.map((c, i) => (
                      <th
                        key={c.key}
                        className={[
                          "text-white font-semibold text-sm md:text-[15px] leading-snug px-4 py-4 border-b-2 border-white/90",
                          i !== columns.length - 1 ? "border-r-2 border-white/90" : "",
                        ].join(" ")}
                      >
                        {c.title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={r.tier} className="transition-colors hover:bg-white/5">
                      <td
                        className={[
                          "text-white font-black text-xl md:text-2xl px-4 py-4 border-r-2 border-white/90",
                          idx !== rows.length - 1 ? "border-b-2 border-white/90" : "",
                        ].join(" ")}
                      >
                        {r.tier}
                      </td>

                      {columns.map((c, i) => {
                        const ok = r.values[c.key];
                        const rightBorder = i !== columns.length - 1 ? "border-r-2 border-white/90" : "";
                        const bottomBorder = idx !== rows.length - 1 ? "border-b-2 border-white/90" : "";

                        return (
                          <td
                            key={c.key}
                            className={["px-4 py-4 text-center align-middle", rightBorder, bottomBorder].join(" ")}
                          >
                            <div className="flex items-center justify-center">
                              {ok ? <CheckMark /> : <CrossMark />}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 md:mt-12 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-10">
            <div className="text-center md:text-left md:max-w-[720px]">
              <h3 className="text-amber-400 font-black uppercase tracking-wide text-[clamp(26px,4.2vw,44px)] drop-shadow-[0_6px_0_rgba(0,0,0,0.55)]">
                Quieres ser auspiciante?
              </h3>
              <p className="text-white/90 font-semibold mt-2 text-[clamp(14px,2.4vw,18px)]">
                Sumate al evento de coctelería más importante de la región
              </p>

              <div className="flex items-center justify-center md:justify-start">
                <a
                  href="https://wa.me/593999817566?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20patrocinios%20para%20UCB%20Masters%20of%20Cocktail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-5 px-8 py-3 rounded-full font-black uppercase text-white
                             bg-amber-500 hover:bg-amber-400 active:scale-[0.99]
                             shadow-[0_18px_50px_rgba(245,158,11,0.22)]
                             transition-all duration-300
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Contactar ahora
                </a>
              </div>
            </div>

            <div className="shrink-0">
              <img
                src={image}
                alt="Personaje UCB"
                className="select-none pointer-events-none
                           drop-shadow-[0_16px_40px_rgba(0,0,0,0.6)]
                           transition-transform duration-300
                           md:hover:scale-[1.02]"
               style={{
  height: "clamp(140px, 18vw, 240px)",
  width: "auto",
}}

                draggable="false"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-35%); }
          100% { transform: translateX(35%); }
        }
      `}</style>
    </section>
  );
}

function CheckMark() {
  return (
    <svg
      width="46"
      height="34"
      viewBox="0 0 46 34"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
    >
      <path
        d="M5 19.5L17.2 29L41 5"
        stroke="#7CDE4F"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossMark() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
      className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
    >
      <path d="M11 11L31 31" stroke="#A31724" strokeWidth="7" strokeLinecap="round" />
      <path d="M31 11L11 31" stroke="#A31724" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
