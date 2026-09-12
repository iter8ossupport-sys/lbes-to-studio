import React from 'react';
import { Hero } from '../components/Hero';
import { PainSection } from '../components/PainSection';
import { Differentiator } from '../components/Differentiator';
import { HowItWorks } from '../components/HowItWorks';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { CTA } from '../components/CTA';

export const Home = () => {
  return (
    <>
      <Hero />
      <PainSection />
      <Differentiator />
      <HowItWorks />
      <PricingSection />
      <FAQSection />
      <CTA />
    </>
  );
};
