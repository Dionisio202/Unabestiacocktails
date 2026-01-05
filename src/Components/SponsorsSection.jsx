import { useMemo, useRef, useEffect, useState } from "react";
import calaca from "../assets/calaca.jpeg";
import waru from "../assets/waru.png";
import move2 from "../assets/page/move4.png";
import hogera from "../assets/hogera.jpeg";
import integra from "../assets/integra.PNG";
import agraz from "../assets/agraz.jpeg";
import quentao from "../assets/quentao.png";
import bestia_cock from "../assets/page/bestia_cock.png";

export default function SponsorsSection() {
  const cardTheme = "black";

  const allSponsors = useMemo(
    () => [
      { id: 1, name: "Tequila Calaca", logo: calaca, fit: "cover" },
            { id: 2, name: "WARÜ", logo: waru, fit: "cover" },

      { id: 3, name: "La Hoguera Asadero", logo: hogera, fit: "cover" },
      { id: 4, name: "INTEGRA FILMS", logo: integra, fit: "cover" },
            { id: 5, name: "AGRAZ London Dry Gin", logo: agraz, fit: "contain" },
      { id: 6, name: "Quentao", logo: quentao, fit: "contain", bg: "black" },
      { id: 7, name: "Bestia Cocktail", logo: bestia_cock, fit: "cover", bg: "black" }
    ],
    []
  );

  return (
    <section id="sponsors" className="py-8 md:py-12 bg-[#0F1616]">
      <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: "min(96vw, 1120px)" }}>
        <div className="mb-5 md:mb-7">
          <h2 className="leading-none font-black uppercase text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] tracking-wider text-center text-[clamp(28px,7vw,56px)]">
            Nuestros Auspiciantes
          </h2>
        </div>

        <div className="flex items-end justify-between gap-4 md:gap-8 mt-5">
          <FeaturedCarousel items={allSponsors} cardTheme={cardTheme} />
          <img
            src={move2}
            alt="UCB Masters of Cocktail"
            className="hidden sm:block w-auto select-none pointer-events-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] shrink-0"
            style={{ height: "clamp(200px, 28vw, 480px)" }}
            draggable="false"
            loading="eager"
          />
        </div>

       
      </div>
    </section>
  );
}

function FeaturedCarousel({ items, cardTheme }) {
  const trackRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const grouped = useMemo(() => {
    if (!items?.length) return [];
    const need = Math.ceil(items.length / 3) * 3;
    const circ = Array.from({ length: need }, (_, i) => items[i % items.length]);
    const out = [];
    for (let i = 0; i < circ.length; i += 3) out.push(circ.slice(i, i + 3));
    return out;
  }, [items]);

  const baseCount = grouped.length;
  const slides = useMemo(() => [...grouped, ...grouped, ...grouped], [grouped]);

  const getSectionWidth = () => {
    const el = trackRef.current;
    if (!el) return 0;
    return baseCount * el.clientWidth;
  };

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

  const clampToMiddleSection = () => {
    const el = trackRef.current;
    if (!el) return;
    const section = getSectionWidth();
    if (!section) return;

    const left = el.scrollLeft;
    const middleStart = section * 0.5;
    const middleEnd = section * 1.5;

    if (left < middleStart) instantShift(section);
    else if (left > middleEnd) instantShift(-section);
  };

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

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const step = () => {
      if (!hovering) {
        el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: "smooth" });
        setTimeout(clampToMiddleSection, 380);
      }
    };

    const id = setInterval(step, 2800);
    return () => clearInterval(id);
  }, [hovering, baseCount]);

  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
    setTimeout(clampToMiddleSection, 380);
  };

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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-[#0F1616] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-[#0F1616] to-transparent z-10" />

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
            <SlotSmall sponsor={group[0]} cardTheme={cardTheme} />
            <SlotLarge sponsor={group[1]} cardTheme={cardTheme} />
            <SlotMedium sponsor={group[2]} cardTheme={cardTheme} />
          </div>
        ))}
      </div>

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

function SlotSmall({ sponsor, cardTheme }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      cardTheme={cardTheme}
      sponsorBg={sponsor.bg}
      className="rounded-xl shadow-md border overflow-hidden"
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

function SlotLarge({ sponsor, cardTheme }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      cardTheme={cardTheme}
      sponsorBg={sponsor.bg}
      className="rounded-xl shadow-md border overflow-hidden"
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

function SlotMedium({ sponsor, cardTheme }) {
  if (!sponsor) return null;
  const cover = sponsor.fit === "cover";
  return (
    <CardShell
      cardTheme={cardTheme}
      sponsorBg={sponsor.bg}
      className="rounded-xl shadow-md border overflow-hidden"
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

function CardShell({ children, className = "", style, cardTheme, sponsorBg }) {
  const resolvedTheme =
    sponsorBg === "black" ? "black" : sponsorBg === "white" ? "white" : cardTheme;

  const bgClass = resolvedTheme === "white" ? "bg-white" : "bg-black";
  const borderClass = resolvedTheme === "white" ? "border-gray-300/40" : "border-white/15";

  return (
    <div className={`${bgClass} ${borderClass} ${className}`} style={style}>
      {children}
    </div>
  );
}

function LogoFrame({ children }) {
  return <div className="w-full h-full flex items-center justify-center p-4 md:p-6">{children}</div>;
}
