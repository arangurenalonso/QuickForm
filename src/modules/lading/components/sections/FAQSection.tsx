import React from 'react';
import { faqsData } from '../../data/landing.data';
import LandingSection from '../common/LandingSection';
import SectionCard from '../common/SectionCard';

const FAQSection = () => {
  return (
    <LandingSection
      eyebrow="FAQ"
      title="Common questions"
      description="A few quick answers to help position QuickForm clearly on the homepage."
      id="faq"
    >
      <div className="mt-12 space-y-4">
        {faqsData.map((faq, index) => {
          const { question, answer } = faq;
          return (
            <SectionCard
              key={question}
              title={question}
              description={answer}
              factor={index}
            />
          );
        })}
      </div>
    </LandingSection>
  );
};

export default FAQSection;
