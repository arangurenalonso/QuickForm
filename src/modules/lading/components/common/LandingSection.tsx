import React from 'react';
import SectionHeader from './SectionHeader';

type LandingSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
  children?: React.ReactNode;
};

const LandingSection = ({
  eyebrow,
  title,
  description,
  id,
  children,
}: LandingSectionProps) => {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div>{children}</div>
    </section>
  );
};

export default LandingSection;
