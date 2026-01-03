import logo_comp from '../assets/page/bg-hero4.png';
import background_image from '../assets/page/bg-herox3.jpeg';

export default function HeroSection() {
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

      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 md:left-8 md:bottom-8 z-10">
        <img
          src={logo_comp}
          alt="UCB Masters of Cocktail - Logo"
          className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto"
          loading="eager"
          draggable="false"
        />
      </div>
    </section>
  );
}
