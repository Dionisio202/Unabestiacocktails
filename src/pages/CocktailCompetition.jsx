import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import CompetitionDetails from "../Components/CompetitionDetails";
import RegistrationForm from "../Components/RegistrationForm";
import Footer from "../Components/Footer";
import SponsorsSection from "../Components/SponsorsSection";
export default function CocktailCompetition() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <HeroSection />
      <CompetitionDetails />
      <SponsorsSection />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
