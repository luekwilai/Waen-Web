import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustMarquee } from './components/TrustMarquee';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { ProjectModal } from './components/ProjectModal';
import { ServicesBento } from './components/ServicesBento';
import { WhyUsComparison } from './components/WhyUsComparison';
import { CostCalculator } from './components/CostCalculator';
import { ProcessTimeline } from './components/ProcessTimeline';
import { PricingSection } from './components/PricingSection';
import { ArticlesSection } from './components/ArticlesSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LineQrModal } from './components/LineQrModal';
import { FloatingQuickContact } from './components/FloatingQuickContact';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [quotePrefillData, setQuotePrefillData] = useState<{
    type?: string;
    planName?: string;
    price?: number;
    pages?: number;
    estimatedDays?: number;
    featuresList?: string[];
  } | null>(null);

  // Handlers
  const handleSelectProjectForQuote = (projectName: string) => {
    setQuotePrefillData({
      type: `เว็บไซต์สไตล์และฟังก์ชันแบบ ${projectName}`,
      featuresList: ['อ้างอิงดีไซน์และฟีเจอร์จากผลงาน ' + projectName],
    });
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName: string, price: number) => {
    setQuotePrefillData({
      planName,
      price,
    });
  };

  const handleApplyCalculatorQuote = (details: {
    type: string;
    pages: number;
    totalPrice: number;
    estimatedDays: number;
    featuresList: string[];
  }) => {
    setQuotePrefillData({
      type: details.type,
      pages: details.pages,
      price: details.totalPrice,
      estimatedDays: details.estimatedDays,
      featuresList: details.featuresList,
    });
  };

  const handleOpenCalculator = () => {
    const calcElem = document.getElementById('calculator');
    if (calcElem) {
      calcElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white font-sans antialiased">
      {/* Navigation */}
      <Navbar 
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero with Live Interactive Mockup Simulator */}
        <Hero 
          onOpenLineModal={() => setIsLineModalOpen(true)}
          onOpenCalculator={handleOpenCalculator}
        />

        {/* 2. Client Trust & Performance Metric Marquee */}
        <TrustMarquee />

        {/* 3. Selected Works / Portfolio Showcase */}
        <PortfolioShowcase 
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 4. Complete Services Bento Grid */}
        <ServicesBento 
          onOpenCalculator={handleOpenCalculator}
        />

        {/* 5. Why Choose Us & Comparison Matrix & CTA Banner */}
        <WhyUsComparison 
          onOpenLineModal={() => setIsLineModalOpen(true)}
        />

        {/* 6. Interactive Instant Cost & SLA Calculator */}
        <CostCalculator 
          onApplyToQuote={handleApplyCalculatorQuote}
        />

        {/* 7. 4-Step Systematic Process & Timeline */}
        <ProcessTimeline />

        {/* 8. Transparent Pricing Packages */}
        <PricingSection 
          onSelectPlan={handleSelectPlan}
        />

        {/* 9. Expert Articles & Guides */}
        <ArticlesSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection 
          onOpenLineModal={() => setIsLineModalOpen(true)}
        />

        {/* 11. Start Your Project / Quotation Request Form */}
        <ContactSection 
          initialQuoteData={quotePrefillData}
          onClearQuoteData={() => setQuotePrefillData(null)}
          onOpenLineModal={() => setIsLineModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenLineModal={() => setIsLineModalOpen(true)} />

      {/* Sticky Mobile Floating Quick Action Toolbar */}
      <FloatingQuickContact 
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProjectForQuote={handleSelectProjectForQuote}
      />

      {/* Line QR Modal */}
      <LineQrModal 
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
      />
    </div>
  );
}

