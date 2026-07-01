import Header from '@/components/Header';
import Hero from '@/components/landing/Hero';
import WhySection from '@/components/landing/WhySection';
import HowItWorks from '@/components/landing/HowItWorks';
import Industries from '@/components/landing/Industries';
import CtaFooter from '@/components/landing/CtaFooter';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhySection />
      <HowItWorks />
      <Industries />
      <CtaFooter />
    </>
  );
}
