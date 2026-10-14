import React from 'react';
import { ArrowRight, Compass, BookOpen, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

interface WhyObjectFlowSectionProps {
  onCtaClick: () => void;
}

export const WhyObjectFlowSection: React.FC<WhyObjectFlowSectionProps> = ({ onCtaClick }) => {
  const benefits = [
    {
      num: '01',
      title: 'A STRUCTURED WORKFLOW',
      desc: 'Follow a clearly organised five-stage process.',
      sub: 'Eliminates confusion and shows exactly which step comes next from concept to publishing.',
      icon: <Compass size={24} className="text-green" />
    },
    {
      num: '02',
      title: 'PRACTICAL INSTRUCTIONS',
      desc: 'Work through the stages with the guidance provided in the playbook.',
      sub: 'Actionable copy-paste prompts, tested parameter guides, and tool walkthroughs.',
      icon: <BookOpen size={24} className="text-green" />
    },
    {
      num: '03',
      title: 'CREATIVE FLEXIBILITY',
      desc: 'Experiment with different everyday objects, characters, and content ideas.',
      sub: 'Apply the workflow to tech gadgets, food items, desk gear, clothing, and beyond.',
      icon: <Sparkles size={24} className="text-green" />
    },
    {
      num: '04',
      title: 'LIFETIME ACCESS',
      desc: 'Return to your purchased course and revisit the material at your own pace.',
      sub: 'No recurring monthly subscriptions. One single payment grants permanent access.',
      icon: <InfinityIcon size={24} className="text-green" />
    }
  ];

  return (
    <section className="landing-section why-section" id="why-objectflow">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge">THE ADVANTAGE</span>
          <h2 className="section-title">LESS GUESSWORK. MORE ROOM TO CREATE.</h2>
          <p className="section-subtitle">
            A practical course designed to help you execute consistently without feeling overwhelmed.
          </p>
        </div>

        {/* 4 Benefit Blocks Grid */}
        <div className="why-benefits-grid">
          {benefits.map((b, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-card-top">
                <div className="benefit-icon-wrap">
                  {b.icon}
                </div>
                <span className="benefit-index">{b.num}</span>
              </div>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-main-desc">{b.desc}</p>
              <p className="benefit-sub-desc">{b.sub}</p>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="section-cta-wrap text-center mt-12">
          <button onClick={onCtaClick} className="btn-primary-cta glow-pulse">
            <span>START YOUR OBJECTFLOW JOURNEY — ₹299</span>
            <ArrowRight size={18} />
          </button>
          <p className="cta-micro-copy">Self-paced · Accessible anywhere · No subscription</p>
        </div>
      </div>
    </section>
  );
};
