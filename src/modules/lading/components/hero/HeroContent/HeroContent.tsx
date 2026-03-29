import { motion } from 'framer-motion';
import HeroActions from './HeroActions';
import HeroBadge from './HeroBadge';
import HeroStats from './HeroStats';

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-2xl"
    >
      <HeroBadge />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Build, publish, and manage forms without making your users think too
        hard.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
        QuickForm is a modern SaaS platform that helps teams create dynamic
        forms, collect structured data, and manage submissions through a
        user-friendly experience that feels simple, fast, and professional.
      </p>

      <HeroActions />
      <HeroStats />
    </motion.div>
  );
};

export default HeroContent;
