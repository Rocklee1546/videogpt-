import React from 'react';

export const TalkingObjectCardVisual: React.FC = () => (
  <div className="card-visual-container">
    <div className="visual-tag-badge">Stage 1 · AI Character</div>
    <div className="mockup-talking-object">
      <div className="character-glow" />
      <svg viewBox="0 0 320 220" className="visual-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#253D28" />
            <stop offset="100%" stopColor="#142217" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1F2A21" />
            <stop offset="100%" stopColor="#0B130D" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8AE65C" />
            <stop offset="100%" stopColor="#69C94A" />
          </radialGradient>
        </defs>

        {/* Ambient background particles */}
        <circle cx="50" cy="40" r="2" fill="#69C94A" opacity="0.4" />
        <circle cx="270" cy="50" r="3" fill="#8AE65C" opacity="0.3" />
        <circle cx="290" cy="160" r="2" fill="#69C94A" opacity="0.5" />
        <circle cx="30" cy="180" r="2.5" fill="#8AE65C" opacity="0.4" />

        {/* Base shadow */}
        <ellipse cx="160" cy="195" rx="90" ry="14" fill="#060907" opacity="0.8" />

        {/* Coffee Mug Character Body */}
        <rect x="95" y="65" width="130" height="115" rx="24" fill="url(#cupGrad)" stroke="#69C94A" strokeWidth="2.5" />
        <path d="M225 90 C255 90 255 150 225 150" stroke="#69C94A" strokeWidth="6" strokeLinecap="round" fill="none" />
        
        {/* Steam Wisps */}
        <path d="M130 50 Q125 35 135 25" stroke="#8AE65C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M160 48 Q165 30 155 20" stroke="#8AE65C" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M190 52 Q185 36 195 24" stroke="#8AE65C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Expressive Face */}
        {/* Big Left Eye */}
        <ellipse cx="135" cy="110" rx="14" ry="16" fill="#0A110B" stroke="#69C94A" strokeWidth="2" />
        <circle cx="137" cy="108" r="8" fill="url(#eyeGlow)" />
        <circle cx="133" cy="104" r="3" fill="#FFFFFF" />

        {/* Big Right Eye */}
        <ellipse cx="185" cy="110" rx="14" ry="16" fill="#0A110B" stroke="#69C94A" strokeWidth="2" />
        <circle cx="187" cy="108" r="8" fill="url(#eyeGlow)" />
        <circle cx="183" cy="104" r="3" fill="#FFFFFF" />

        {/* Animated Talking Mouth */}
        <path d="M142 142 Q160 162 178 142 Z" fill="#E65C5C" stroke="#FFFFFF" strokeWidth="1.5" />
        <rect x="150" y="142" width="20" height="4" rx="2" fill="#FFFFFF" />

        {/* Cute blush marks */}
        <ellipse cx="118" cy="128" rx="7" ry="4" fill="#E65C5C" opacity="0.4" />
        <ellipse cx="202" cy="128" rx="7" ry="4" fill="#E65C5C" opacity="0.4" />

        {/* Dialogue audio wave indicator */}
        <rect x="30" y="80" width="3" height="16" rx="1.5" fill="#69C94A" opacity="0.7" />
        <rect x="36" y="74" width="3" height="28" rx="1.5" fill="#8AE65C" />
        <rect x="42" y="82" width="3" height="12" rx="1.5" fill="#69C94A" opacity="0.7" />
        <rect x="48" y="70" width="3" height="36" rx="1.5" fill="#8AE65C" />
      </svg>
    </div>
  </div>
);

export const DirectorPromptCardVisual: React.FC = () => (
  <div className="card-visual-container">
    <div className="visual-tag-badge">Stage 2 · Claude Prompt</div>
    <div className="mockup-code-block">
      <div className="code-header">
        <span className="code-dot red" />
        <span className="code-dot yellow" />
        <span className="code-dot green" />
        <span className="code-title">director-prompt-v2.md</span>
      </div>
      <div className="code-content">
        <p><span className="keyword">SYSTEM:</span> You are an award-winning commercial director.</p>
        <p><span className="keyword">CHARACTER:</span> Expressive talking coffee mug</p>
        <p><span className="keyword">SCENE BEATS:</span></p>
        <p className="indent"><span className="token-num">01.</span> Hook: Mug realizes Monday 8 AM alarm.</p>
        <p className="indent"><span className="token-num">02.</span> Action: Eyes widen, dramatic gasp.</p>
        <p className="indent"><span className="token-num">03.</span> Dialogue: "Don't sip me yet, I need coffee too!"</p>
        <p><span className="keyword">OUTPUT:</span> 6 synced Google Flow clip prompts</p>
      </div>
    </div>
  </div>
);

export const FlowAgentClipsVisual: React.FC = () => (
  <div className="card-visual-container">
    <div className="visual-tag-badge">Stage 3 · Google Flow Agent</div>
    <div className="mockup-flow-timeline">
      <div className="timeline-header">
        <span className="model-pill">Omni Flash 1.1</span>
        <span className="status-pill">6 Clips Generated</span>
      </div>
      <div className="clips-grid">
        {[1, 2, 3, 4].map((clipNum) => (
          <div key={clipNum} className="clip-box">
            <div className="clip-thumb">
              <span className="play-icon-tiny">▶</span>
              <span className="clip-timer">00:10</span>
            </div>
            <div className="clip-meta">Clip #{clipNum}</div>
          </div>
        ))}
      </div>
      <div className="timeline-progress-bar">
        <div className="progress-fill" style={{ width: '85%' }} />
      </div>
    </div>
  </div>
);

export const CapCutAssemblyVisual: React.FC = () => (
  <div className="card-visual-container">
    <div className="visual-tag-badge">Stage 4 · Final Polish</div>
    <div className="mockup-editor-timeline">
      <div className="editor-tracks">
        <div className="track-row video-track">
          <span className="track-label">VIDEO</span>
          <div className="track-segments">
            <span className="segment seg-1">Clip 1</span>
            <span className="segment seg-2">Clip 2</span>
            <span className="segment seg-3">Clip 3</span>
          </div>
        </div>
        <div className="track-row audio-track">
          <span className="track-label">VOICE</span>
          <div className="track-waveform">
            <span className="wave-bar" />
            <span className="wave-bar tall" />
            <span className="wave-bar" />
            <span className="wave-bar tall" />
            <span className="wave-bar short" />
            <span className="wave-bar" />
          </div>
        </div>
        <div className="track-row text-track">
          <span className="track-label">CAPTIONS</span>
          <div className="caption-pill">✨ Auto 9:16 Kinetic Subtitles</div>
        </div>
      </div>
    </div>
  </div>
);
