import React from 'react';
import { featuresData } from '../../data/landing.data';
import LandingSection from '../common/LandingSection';
import SectionCard from '../common/SectionCard';

const FeaturesSection = () => {
  return (
    <LandingSection
      eyebrow="Why QuickForm"
      title="Everything your team needs to create forms that people actually enjoy using"
      description="The goal is not only to build forms faster. It is to make the whole experience cleaner for administrators and easier for end users."
      id="features"
    >
      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuresData.map((feature, index) => {
          const { title, description, icon } = feature;
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

export default FeaturesSection;
