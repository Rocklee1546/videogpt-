import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FiveStagesSectionProps {
  onCtaClick: () => void;
}

export const FiveStagesSection: React.FC<FiveStagesSectionProps> = ({ onCtaClick }) => {
  const stages = [
    {
      num: '0',
      name: 'GET READY',
      desc: 'Prepare the required accounts and tools before beginning the workflow.',
      tools: 'ChatGPT · Claude · Google Flow · CapCut/VN',
      charImg: '/stage-char-toolbox.jpg',
      charAlt: 'Cute toolbox character',
      detail: '5-minute setup checklist ensuring you have proper accounts, model selections, and business object ready before starting.'
    },
    {
      num: '1',
      name: 'CREATE YOUR OBJECT',
      desc: 'Use Object Talk GPT to develop your talking-object concept.',
      tools: 'Object Talk GPT · DALL-E 3',
      charImg: '/stage-char-apple.jpg',
      charAlt: 'Cute apple fruit character',
      detail: 'Turn any object—phone, cup, car, or food item—into a character with big expressive eyes and an open speaking mouth.'
    },
    {
      num: '2',
      name: 'PREPARE THE DIRECTOR PROMPT',
      desc: 'Follow the guided workflow using Claude and the director prompt.',
      tools: 'Claude 3.5 Sonnet / Haiku',
      charImg: '/stage-char-shoe.jpg',
      charAlt: 'Cute sneaker shoe character',
      detail: 'Upload your character image and get structured scene beats, hook scripts, and ready-to-render camera angles.'
    },
    {
      num: '3',
      name: 'GENERATE THE CLIPS',
      desc: 'Use the Google Flow Agent workflow to generate the individual clips.',
      tools: 'Google Flow Agent · Omni Flash 1.1',
      charImg: '/stage-char-broccoli.jpg',
      charAlt: 'Cute broccoli vegetable character',
      detail: 'Paste your director prompts into Google Flow Agent to render smooth, synchronized 10-second character video clips.'
    },
    {
      num: '4',
      name: 'JOIN AND PUBLISH',
      desc: 'Combine your clips using CapCut or VN and prepare your finished video.',
      tools: 'CapCut / VN Video Editor',
      charImg: '/stage-char-phone.jpg',
      charAlt: 'Cute smartphone character',
      detail: 'Import your clips, trim silences, add punchy auto-captions and background music, and export in crisp 9:16 vertical resolution.'
    }
  ];

  return (
    <section className="landing-section stages-section" id="five-stages">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge">STRUCTURED ROADMAP</span>
          <h2 className="section-title">FROM IDEA TO VIDEO — STEP BY STEP</h2>
          <p className="section-subtitle">
            No need to guess what comes next. The ObjectFlow Playbook organises the process into five guided stages.
          </p>
        </div>

        {/* Timeline Roadmap */}
        <div className="stages-timeline-wrapper">
          <div className="timeline-spine-line" />

          <div className="stages-cards-list">
            {stages.map((stage, idx) => (
              <div key={idx} className="stage-row-item">
                <div className="stage-node-badge">
                  <span className="stage-number-circle">{stage.num}</span>
                </div>

                <div className="stage-content-card">
                  <div className="stage-card-top">
                    <div className="stage-title-wrap">
                      <span className="stage-pill-tag">STAGE {stage.num}</span>
                      <h3 className="stage-headline">{stage.name}</h3>
                    </div>
                    <div className="stage-char-img-wrap">
                      <img src={stage.charImg} alt={stage.charAlt} className="stage-char-img" />
                    </div>
                  </div>

                  <p className="stage-main-desc">{stage.desc}</p>
                  <p className="stage-extra-detail">{stage.detail}</p>

                  <div className="stage-tools-badge">
                    <span className="tools-label">Tools covered:</span>
                    <span className="tools-list">{stage.tools}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Bottom CTA */}
        <div className="section-cta-wrap text-center mt-12">
          <button onClick={onCtaClick} className="btn-primary-cta glow-pulse">
            <span>GET THE COMPLETE FIVE-STAGE PLAYBOOK — ₹299</span>
            <ArrowRight size={18} />
          </button>
          <p className="cta-micro-copy">Instant course access · Self-paced practical learning</p>
        </div>
      </div>
    </section>
  );
};
