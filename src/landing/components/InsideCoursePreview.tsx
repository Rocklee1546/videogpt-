import React, { useState } from 'react';
import { 
  Layout, 
  CheckSquare, 
  Terminal, 
  Wrench, 
  Lightbulb, 
  HelpCircle, 
  Copy, 
  Check, 
  Play 
} from 'lucide-react';

interface InsideCoursePreviewProps {
  onCtaClick: () => void;
}

export const InsideCoursePreview: React.FC<InsideCoursePreviewProps> = ({ onCtaClick }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checklist' | 'prompt' | 'toolkit'>('dashboard');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(`Create a single character image of a [OBJECT] that is alive and can talk...`);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <section className="landing-section preview-section" id="inside-course">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge">INTERACTIVE WORKSPACE</span>
          <h2 className="section-title">TAKE A LOOK INSIDE OBJECTFLOW</h2>
          <p className="section-subtitle">
            See the guided workspace you'll use to follow the AI video creation process.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="preview-tabs-container">
          <div className="preview-tabs-nav" role="tablist">
            <button
              className={`preview-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              role="tab"
              aria-selected={activeTab === 'dashboard'}
            >
              <Layout size={18} />
              <span>Workspace Dashboard</span>
            </button>
            <button
              className={`preview-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
              onClick={() => setActiveTab('checklist')}
              role="tab"
              aria-selected={activeTab === 'checklist'}
            >
              <CheckSquare size={18} />
              <span>Get Ready Checklist</span>
            </button>
            <button
              className={`preview-tab-btn ${activeTab === 'prompt' ? 'active' : ''}`}
              onClick={() => setActiveTab('prompt')}
              role="tab"
              aria-selected={activeTab === 'prompt'}
            >
              <Terminal size={18} />
              <span>Director & Backup Prompts</span>
            </button>
            <button
              className={`preview-tab-btn ${activeTab === 'toolkit' ? 'active' : ''}`}
              onClick={() => setActiveTab('toolkit')}
              role="tab"
              aria-selected={activeTab === 'toolkit'}
            >
              <Wrench size={18} />
              <span>Creator Toolkit & Calculators</span>
            </button>
          </div>
        </div>

        {/* Browser Mockup Window */}
        <div className="browser-mockup-window">
          <div className="browser-chrome">
            <div className="browser-traffic-lights">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="browser-address-bar">
              <span className="lock-icon">🔒</span>
              <span className="url-text">https://objectflow-playbook.thynkdigitalsolutions.com/workspace</span>
            </div>
          </div>

          <div className="browser-content-canvas">
            {/* TAB 1: WORKSPACE DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="preview-tab-view dashboard-view">
                <div className="mock-guide-assistant">
                  <div className="mock-mascot-box">
                    <div className="dino-avatar">🦖</div>
                    <div className="mascot-speech-bubble">
                      <p className="speech-lead"><strong>Dino Guide:</strong></p>
                      <p className="speech-body">
                        "Welcome to Stage 0! Let's get your tools ready. Tick each task as you go, then we'll create your talking character."
                      </p>
                      <div className="speech-actions">
                        <span className="mini-btn primary">Let's start Stage 0</span>
                        <span className="mini-btn secondary">View Overview</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mock-stages-sidebar-grid">
                  {[
                    { id: 0, title: 'Get Ready', desc: 'Prepare accounts & tools', status: 'In Progress' },
                    { id: 1, title: 'Create Your Object', desc: 'Object Talk GPT character image', status: 'Locked' },
                    { id: 2, title: 'Director Prompt', desc: 'Upload to Claude & generate beats', status: 'Locked' },
                    { id: 3, title: 'Generate Clips', desc: 'Google Flow Agent Omni Flash 1.1', status: 'Locked' },
                    { id: 4, title: 'Join & Publish', desc: 'CapCut / VN 9:16 final assembly', status: 'Locked' },
                  ].map((s) => (
                    <div key={s.id} className={`mock-stage-mini-card ${s.id === 0 ? 'active' : ''}`}>
                      <div className="stage-mini-header">
                        <span className="stage-pill">STAGE {s.id}</span>
                        <span className={`status-pill ${s.id === 0 ? 'active' : ''}`}>{s.status}</span>
                      </div>
                      <h4 className="stage-mini-title">{s.title}</h4>
                      <p className="stage-mini-desc">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: GET READY CHECKLIST */}
            {activeTab === 'checklist' && (
              <div className="preview-tab-view checklist-view">
                <div className="checklist-card-preview">
                  <div className="checklist-header">
                    <span className="stage-badge-green">Stage 0 · Preparation</span>
                    <h3>Get Ready: Setup Verification</h3>
                    <p className="lead-text">Five minutes of setup saves twenty in class.</p>
                  </div>
                  <div className="checklist-items-preview">
                    {[
                      { text: 'I have a ChatGPT account (to open the Object Talk GPT).', checked: true },
                      { text: 'I have a Claude account at claude.ai for script & prompt expansion.', checked: true },
                      { text: 'I can open Google Flow, the Flow Agent and the Omni Flash 1.1 model.', checked: false },
                      { text: 'CapCut or VN is installed to join and auto-caption the clips.', checked: true },
                      { text: "I've picked my object (Something from my own business or desk).", checked: false },
                    ].map((item, idx) => (
                      <div key={idx} className={`checklist-item-row ${item.checked ? 'is-checked' : ''}`}>
                        <div className={`checkbox-indicator ${item.checked ? 'checked' : ''}`}>
                          {item.checked ? '✓' : ''}
                        </div>
                        <span className="item-text">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="checklist-footer-note">
                    <strong>Note:</strong> Menu names inside ChatGPT and Google Flow change often. The playbook shows you how to pick the closest match every time.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PROMPTS */}
            {activeTab === 'prompt' && (
              <div className="preview-tab-view prompt-view">
                <div className="prompt-card-preview">
                  <div className="prompt-header-row">
                    <div>
                      <span className="stage-badge-green">Verified Prompt Asset</span>
                      <h4>Backup Prompt — Talking Object Character</h4>
                      <p className="prompt-sub">Paste into ChatGPT · Fill in the [brackets]</p>
                    </div>
                    <button onClick={handleCopyPrompt} className="copy-action-btn">
                      {copiedPrompt ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <div className="prompt-code-terminal">
                    <pre>
{`Create a single character image of a [OBJECT, e.g. silver laptop] that is alive and can talk.

CHARACTER:
- The object keeps its real shape, materials and details: realistic textures, real reflections, real proportions
- Give it a friendly, expressive cartoon face placed where it feels natural: [FACE POSITION, e.g. on the laptop screen]
- Two large expressive eyes with eyebrows, and ONE clearly visible mouth with lips, slightly open, so it can be animated to speak
- Personality: [PERSONALITY, e.g. cheeky / dramatic / grumpy / sweet]

SCENE:
- Placed in [SETTING, e.g. a messy student desk at night], soft cinematic lighting, shallow depth of field
- The object fills about 60% of the frame, centered, facing the camera

FORMAT:
- Vertical 9:16, premium 3D animated-film style blended with photoreal textures`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TOOLKIT */}
            {activeTab === 'toolkit' && (
              <div className="preview-tab-view toolkit-view">
                <div className="toolkit-grid-preview">
                  <div className="toolkit-box">
                    <div className="box-title">
                      <Lightbulb size={18} className="text-green" />
                      <span>Idea Starters</span>
                    </div>
                    <ul className="toolkit-list">
                      <li>💼 <strong>Tech:</strong> Laptop crying over 99 open Chrome tabs</li>
                      <li>☕ <strong>Cafe:</strong> Espresso cup buzzing with raw Monday caffeine</li>
                      <li>👟 <strong>Fitness:</strong> Running shoe motivating owner out of bed</li>
                      <li>📦 <strong>E-Commerce:</strong> Delivery box excited to reach customer doorstep</li>
                    </ul>
                  </div>

                  <div className="toolkit-box">
                    <div className="box-title">
                      <Play size={18} className="text-green" />
                      <span>Length-to-Clips Guidance</span>
                    </div>
                    <div className="calculator-table">
                      <div className="calc-row header">
                        <span>Video Length</span>
                        <span>Clips Needed</span>
                        <span>Flow Credits</span>
                      </div>
                      <div className="calc-row">
                        <span>30 Seconds</span>
                        <strong className="text-green">3 Clips (10s ea)</strong>
                        <span>Low</span>
                      </div>
                      <div className="calc-row">
                        <span>60 Seconds</span>
                        <strong className="text-green">6 Clips (10s ea)</strong>
                        <span>Standard</span>
                      </div>
                      <div className="calc-row">
                        <span>90 Seconds</span>
                        <strong className="text-green">9 Clips (10s ea)</strong>
                        <span>Extended</span>
                      </div>
                    </div>
                  </div>

                  <div className="toolkit-box full-width">
                    <div className="box-title">
                      <HelpCircle size={18} className="text-green" />
                      <span>Troubleshooting Resources</span>
                    </div>
                    <div className="faq-pills-row">
                      <span className="trouble-pill">Mouth not moving? Use front-facing 60% framing</span>
                      <span className="trouble-pill">Blurry textures? Add "photoreal specular highlights"</span>
                      <span className="trouble-pill">Sync issue? Trim silence in CapCut</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Action CTA */}
        <div className="section-cta-wrap text-center">
          <button onClick={onCtaClick} className="btn-primary-cta glow-pulse">
            GET ACCESS FOR ₹299
          </button>
          <p className="cta-micro-copy">One-time payment. Instant lifetime course access.</p>
        </div>
      </div>
    </section>
  );
};
