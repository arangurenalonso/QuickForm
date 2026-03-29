import NavbarLandingPage from './components/navbar/NavbarLandingPage';
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import UseCasesSection from './components/sections/UseCasesSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import FAQSection from './components/sections/FAQSection';
import CTASection from './components/sections/CTASection';
import QuickFormFooter from './components/footer/QuickFormFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarLandingPage />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <FAQSection />
      <CTASection />
      <QuickFormFooter />
    </div>
  );
};

export default LandingPage;
