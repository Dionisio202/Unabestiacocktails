import { useMemo, useRef, useEffect, useState } from "react";
import calaca from "../assets/calaca.jpeg";
import casa_ambatena from "../assets/casa-bg.png"; // tu fondo rojo
import move2 from "../assets/page/move4.png";
import hogera from "../assets/hogera.jpeg";
import integra from "../assets/integra.PNG";
import agraz from "../assets/agraz.jpeg";

export default function SponsorsSection() {
  // Marca con fit: "cover" los que quieras que ABARQUEN TODO el card (como Casa)
  const allSponsors = useMemo(
    () => [
      { id: 5, name: "AGRAZ London Dry Gin", logo: agraz,  fit: "contain" }, // fondo blanco, mejor contain
      { id: 1, name: "Hotel Casa Ambateña",  logo: casa_ambatena, fit: "cover" }, // cuadro rojo, full bleed
      { id: 2, name: "Tequila Calaca",       logo: calaca, fit: "cover" },   // si quieres que llene, usa cover
      { id: 3, name: "La Hoguera Asadero",   logo: hogera, fit: "cover" }, // o cambia a "cover" si prefieres
      { id: 4, name: "INTEGRA FILMS",        logo: integra, fit: "cover" },
    ],
    []
  );

  return (
    <section id="sponsors" className="py-8 md:py-12 bg-[#0F1616]">
      {/* Contenedor más compacto en pantallas pequeñas */}
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "min(96vw, 1120px)" }}>
        <div className="mb-5 md:mb-7">
          <h2 className="leading-none font-black uppercase text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] tracking-wider text-center text-[clamp(28px,7vw,56px)]">
            Nuestros Auspiciantes
          </h2>
        </div>

        {/* Carrusel pequeño (3 logos) + personaje */}
        <div className="flex items-end justify-between gap-4 md:gap-8">
          <FeaturedCarousel items={allSponsors} />
          <img
            src={move2}
            alt="UCB Masters of Cocktail"
            className="hidden sm:block w-auto select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] shrink-0"
            style={{ height: "clamp(200px, 28vw, 480px)" }}
            draggable="false"
            loading="eager"
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-10">
          <h3 className="font-extrabold text-amber-300 uppercase tracking-wide text-[clamp(20px,4.2vw,32px)]">
            ¿Quieres ser auspiciante?
          </h3>
          <p className="text-white/90 mt-2 mb-5 md:mb-6 text-[clamp(14px,2.8vw,18px)]">
            Súmate al evento de coctelería más importante de la región.
          </p>
          <a
            href="https://wa.me/593999817566?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20patrocinios%20para%20UCB%20Masters%20of%20Cocktail"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 py-3 px-6 md:py-3.5 md:px-8 text-[clamp(14px,3.6vw,18px)]"
          >
            Contactar Ahora
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
/*  Carrusel pequeño infinito (3 por slide)      */
/*  con recentrado "teleport" sin rebote         */
/* ───────────────────────────────────────────── */
function FeaturedCarousel({ items }) {
  const trackRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Agrupar de 3 en 3 (relleno circular)
  const grouped = useMemo(() => {
    if (!items?.length) return [];
    const need = Math.ceil(items.length / 3) * 3;
    const circ = Array.from({ length: need }, (_, i) => items[i % items.length]);
    const out = [];
    for (let i = 0; i < circ.length; i += 3) out.push(circ.slice(i, i + 3));
    return out;
  }, [items]);

  const baseCount = grouped.length;
  const slides = useMemo(() => [...grouped, ...grouped, ...grouped], [grouped]); // 3 secciones

  const getSectionWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    // cada "slide" ocupa el 100% del ancho visible
    return baseCount * el.clientWidth;
  };

  // Teleport SIN animación ni snap (para que no se note el salto)
  const instantShift = (delta) => {
    const el = trackRef.current;
    if (!el || delta === 0) return;

    const prevBehavior = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.classList.add("snap-none");

    el.scrollLeft += delta;

    requestAnimationFrame(() => {
      el.classList.remove("snap-none");
      el.style.scrollBehavior = prevBehavior || "";
    });
  };

  // Mantenerse en la sección central (sin salto visible)
  const clampToMiddleSection = () => {
    const el = trackRef.current;
    if (!el) return;
    const section = getSectionWidth();
    if (!section) return;

    const left = el.scrollLeft;
    const middleStart = section * 0.5; // umbrales tolerantes
    const middleEnd = section * 1.5;

    if (left < middleStart) {
      instantShift(section); // mover a la misma posición en la sección central
    } else if (left > middleEnd) {
      instantShift(-section);
    }
  };

  // Arrancar en sección del medio y re-centrar en resize
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const setToMiddle = () => {
      const section = getSectionWidth();
      const prevBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.classList.add("snap-none");
      el.scrollLeft = section;
      requestAnimationFrame(() => {
        el.classList.remove("snap-none");
        el.style.scrollBehavior = prevBehavior || "";
      });
    };

    setToMiddle();
    const ro = new ResizeObserver(setToMiddle);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseCount]);

  // Autoplay continuo (smooth para avanzar; clamp instantáneo)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      if (!hovering) {
        el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: "smooth" });
        setTimeout(clampToMiddleSection, 380); // ajustar tras la animación
      }
    };

    const id = setInterval(step, 2800);
    return () => clearInterval(id);
  }, [hovering, baseCount]);

  // Flechas
  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
    setTimeout(clampToMiddleSection, 380);
  };

  // Corrección también cuando arrastran manualmente
  const onScroll = () => {
    if (FeaturedCarousel._t) clearTimeout(FeaturedCarousel._t);
    FeaturedCarousel._t = setTimeout(clampToMiddleSection, 120);
  };

  const hideScrollbar =
    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div
      className="relative flex-1 min-w-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Fades laterales */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-[#0F1616] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-[#0F1616] to-transparent z-10" />

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className={`overflow-x-auto snap-x snap-mandatory scroll-smooth ${hideScrollbar} flex`}
      >
        {slides.map((group, idx) => (
          <div
            key={idx}
            className="snap-start flex flex-shrink-0 items-center gap-4 md:gap-6 px-2 md:px-4"
            style={{ width: "100%" }}
          >
            <SlotSmall sponsor={group[0]} />
            <SlotLarge sponsor={group[1]} />
            <SlotMedium sponsor={group[2]} />
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={() => scrollBy(-1)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 border border-white/20 hover:bg-black/60 text-white items-center justify-center"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 border border-white/20 hover:bg-black/60 text-white items-center justify-center"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Slots con tamaños fijos pero “clamp”         */
/*  - Si fit === 'cover' => llena el card        */
/*  - Si fit === 'contain' => respeta el logo    */
/* ───────────────────────────────────────────── */
function SlotSmall({ sponsor }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      className="rounded-xl shadow-md border border-gray-300/30 overflow-hidden"
      style={{ width: "clamp(130px, 20vw, 180px)", height: "clamp(170px, 26vw, 260px)" }}
    >
      {cover ? (
        <img src={sponsor.logo} alt={sponsor.name} className="block w-full h-full object-cover" />
      ) : (
        <LogoFrame>
          <img src={sponsor.logo} alt={sponsor.name} className="block max-h-[85%] max-w-[85%] object-contain" />
        </LogoFrame>
      )}
    </CardShell>
  );
}

function SlotLarge({ sponsor }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      className="rounded-xl shadow-md overflow-hidden"
      borderTone={cover ? "border-transparent" : "border-gray-300/30"}
      style={{ width: "clamp(260px, 34vw, 430px)", height: "clamp(260px, 34vw, 430px)" }}
    >
      {cover ? (
        <img src={sponsor.logo} alt={sponsor.name} className="block w-full h-full object-cover" />
      ) : (
        <LogoFrame>
          <img src={sponsor.logo} alt={sponsor.name} className="block max-h-[85%] max-w-[85%] object-contain" />
        </LogoFrame>
      )}
    </CardShell>
  );
}

function SlotMedium({ sponsor }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      className="rounded-xl shadow-md border border-gray-300/30 overflow-hidden"
      style={{ width: "clamp(180px, 26vw, 260px)", height: "clamp(220px, 30vw, 320px)" }}
    >
      {cover ? (
        <img src={sponsor.logo} alt={sponsor.name} className="block w-full h-full object-cover" />
      ) : (
        <LogoFrame>
          <img src={sponsor.logo} alt={sponsor.name} className="block max-h-[85%] max-w-[85%] object-contain" />
        </LogoFrame>
      )}
    </CardShell>
  );
}

/* ───────────────────────────────────────────── */
/*  Componentes base                             */
/* ───────────────────────────────────────────── */
function CardShell({ children, className = "", borderTone = "border-gray-300/30", style }) {
  return (
    <div className={`bg-white ${borderTone} ${className} `} style={style}>
      {children}
    </div>
  );
}

function LogoFrame({ children }) {
  return <div className="w-full h-full flex items-center justify-center p-4 md:p-6">{children}</div>;
}
