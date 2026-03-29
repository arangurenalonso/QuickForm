'use client';
import HeroContent from './HeroContent/HeroContent';
import ContactFormContainer from './HeroContact/ContactFormContainer';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--foreground)/0.06),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <HeroContent />
        <div className="h-full display-none items-center justify-center lg:flex">
          <ContactFormContainer />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
