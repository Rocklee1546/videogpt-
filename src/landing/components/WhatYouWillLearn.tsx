import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { 
  TalkingObjectCardVisual, 
  DirectorPromptCardVisual, 
  FlowAgentClipsVisual, 
  CapCutAssemblyVisual 
} from './CourseVisuals';

interface WhatYouWillLearnProps {
  onCtaClick: () => void;
}

export const WhatYouWillLearn: React.FC<WhatYouWillLearnProps> = ({ onCtaClick }) => {
  const cards = [
    {
      step: '01',
      title: 'CREATE YOUR TALKING OBJECT',
      desc: 'Explore how everyday objects can become expressive characters and develop a concept for your video.',
      visual: <TalkingObjectCardVisual />,
      highlights: ['Expressive facial placement', 'Realistic textures & reflections', '9:16 vertical character framing']
    },
    {
      step: '02',
      title: 'PREPARE YOUR PROMPT',
      desc: 'Follow the guided concept and director-prompt workflow covered in the playbook.',
      visual: <DirectorPromptCardVisual />,
      highlights: ['Structured Claude director prompt', 'Hook-to-action storytelling beats', 'Precise motion & dialogue prompts']
    },
    {
      step: '03',
      title: 'GENERATE YOUR VIDEO CLIPS',
      desc: 'Learn the process of generating individual clips using the Google Flow Agent workflow.',
      visual: <FlowAgentClipsVisual />,
      highlights: ['Google Flow Agent setup', 'Omni Flash 1.1 model settings', 'High-detail lip-sync clip generation']
    },
    {
      step: '04',
      title: 'JOIN AND PUBLISH',
      desc: 'Bring your clips together using CapCut or VN and prepare the finished video for publishing.',
      visual: <CapCutAssemblyVisual />,
      highlights: ['CapCut & VN mobile/desktop workflow', 'Auto-generated kinetic captions', 'Export ready for Reels, Shorts & TikTok']
    }
  ];

  return (
    <section className="landing-section learn-section" id="what-you-learn">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge">CORE CURRICULUM</span>
          <h2 className="section-title">YOUR IDEA. YOUR CHARACTER. YOUR VIDEO.</h2>
          <p className="section-subtitle">
            Explore the complete workflow for developing and assembling AI-generated talking-object videos.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="learn-cards-grid">
          {cards.map((c, i) => (
            <div key={i} className="learn-card">
              <div className="learn-card-visual-wrapper">
                {c.visual}
              </div>

              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-step-pill">PART {c.step}</span>
                </div>
                <h3 className="learn-card-title">{c.title}</h3>
                <p className="learn-card-desc">{c.desc}</p>

                <ul className="learn-card-checklist">
                  {c.highlights.map((h, hIdx) => (
                    <li key={hIdx}>
                      <CheckCircle2 size={14} className="text-green flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="section-cta-wrap text-center mt-12">
          <button onClick={onCtaClick} className="btn-primary-cta glow-pulse">
            <span>LEARN THE WORKFLOW FOR JUST ₹299</span>
            <ArrowRight size={18} />
          </button>
          <p className="cta-micro-copy">One-time payment · Lifetime access · Revisit anytime</p>
        </div>
      </div>
    </section>
  );
};
