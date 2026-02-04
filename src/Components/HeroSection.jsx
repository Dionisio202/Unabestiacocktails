import logo_comp from '../assets/page/bg-hero4.png';
import background_image from '../assets/page/bg-herox3.jpeg';

export default function HeroSection() {
 const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=-1.3984883,-78.4388232";


  return (
    <section
      id="home"
      className="min-h-[100vh] relative overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 md:left-8 md:bottom-8 z-10 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full"
        aria-label="Abrir ubicación en Google Maps"
      >
        <img
          src={logo_comp}
          alt="UBC Masters of Cocktail - Logo"
          className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto select-none
                     transition-transform duration-300 ease-out
                     hover:scale-[1.04] active:scale-[0.98]
                     drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
          loading="eager"
          draggable="false"
        />
      </a>
    </section>
  );
}
