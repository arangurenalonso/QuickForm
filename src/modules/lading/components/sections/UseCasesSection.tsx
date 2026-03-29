import React from 'react';
import { useCasesData } from '../../data/landing.data';
import LandingSection from '../common/LandingSection';
import SectionCard from '../common/SectionCard';

const UseCasesSection = () => {
  return (
    <LandingSection
      eyebrow="Use cases"
      title="A flexible platform for real business workflows"
      description="QuickForm is not limited to one team. It adapts to the way different areas capture information, apply rules, and work with submissions."
      id="use-cases"
    >
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {useCasesData.map((item, index) => {
          const { title, description, icon } = item;
          return (
            <SectionCard
              key={title}
              title={title}
              description={description}
              icon={icon}
              factor={index}
            />
          );
        })}
      </div>
    </LandingSection>
  );
};

export default UseCasesSection;
